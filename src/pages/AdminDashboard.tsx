import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Shield, Users, FileText, MessageSquare, AlertTriangle, BarChart3, TrendingUp } from "lucide-react";

interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  roles: string[];
}

interface EvidenceFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
  incident_date: string;
  description: string;
}

interface ForumPost {
  id: string;
  title: string;
  content: string;
  is_anonymous: boolean;
  is_flagged: boolean;
  flag_reason: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([]);
  const [flaggedPosts, setFlaggedPosts] = useState<ForumPost[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalEvidence: 0,
    activeConversations: 0,
  });

  useEffect(() => {
    checkAdminStatus();
  }, [user, loading]);

  const checkAdminStatus = async () => {
    if (loading) return;
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase.rpc("has_role", {
      _user_id: user.id,
      _role: "admin",
    });

    if (error || !data) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    setIsAdmin(true);
    loadAdminData();
  };

  const loadAdminData = async () => {
    setLoadingData(true);

    // Load users with their roles
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("id, user_id, full_name, created_at");

    const { data: rolesData } = await supabase
      .from("user_roles")
      .select("user_id, role");

    if (profilesData && rolesData) {
      const usersWithRoles = profilesData.map((profile) => ({
        id: profile.user_id,
        email: "hidden@privacy.com", // Email not stored in profiles
        full_name: profile.full_name || "Anonymous",
        created_at: profile.created_at,
        roles: rolesData
          .filter((r) => r.user_id === profile.user_id)
          .map((r) => r.role),
      }));
      setUsers(usersWithRoles);
    }

    // Load evidence files (count only, no access to actual files)
    const { data: evidenceData } = await supabase
      .from("evidence_files")
      .select("id, file_name, file_type, file_size, created_at, incident_date, description");

    if (evidenceData) {
      setEvidenceFiles(evidenceData);
    }

    // Load flagged posts
    const { data: postsData } = await supabase
      .from("forum_posts")
      .select("id, title, content, is_anonymous, is_flagged, flag_reason, created_at")
      .eq("is_flagged", true)
      .order("created_at", { ascending: false });

    if (postsData) {
      setFlaggedPosts(postsData);
    }

    // Load statistics
    const { count: totalPostsCount } = await supabase
      .from("forum_posts")
      .select("*", { count: "exact", head: true });

    const { count: activeConversationsCount } = await supabase
      .from("conversations")
      .select("*", { count: "exact", head: true });

    setStats({
      totalUsers: profilesData?.length || 0,
      totalPosts: totalPostsCount || 0,
      totalEvidence: evidenceData?.length || 0,
      activeConversations: activeConversationsCount || 0,
    });

    setLoadingData(false);
  };

  const handleResolvePost = async (postId: string) => {
    const { error } = await supabase
      .from("forum_posts")
      .update({ is_flagged: false, is_resolved: true })
      .eq("id", postId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to resolve post",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Post resolved successfully",
    });

    loadAdminData();
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">
            Manage users, evidence reports, and moderate content
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered accounts</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Forum Posts</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">Community discussions</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Evidence Files</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvidence}</div>
              <p className="text-xs text-muted-foreground">Secure documents</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeConversations}</div>
              <p className="text-xs text-muted-foreground">Private conversations</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users" className="gap-2">
              <Users className="h-4 w-4" />
              Users ({users.length})
            </TabsTrigger>
            <TabsTrigger value="evidence" className="gap-2">
              <FileText className="h-4 w-4" />
              Evidence ({evidenceFiles.length})
            </TabsTrigger>
            <TabsTrigger value="moderation" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Flagged Posts ({flaggedPosts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            {users.map((u) => (
              <Card key={u.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{u.full_name}</CardTitle>
                  <CardDescription>Joined: {new Date(u.created_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {u.roles.map((role) => (
                      <Badge key={role} variant={role === "admin" ? "default" : "secondary"}>
                        {role}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="evidence" className="space-y-4">
            {evidenceFiles.map((file) => (
              <Card key={file.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{file.file_name}</CardTitle>
                  <CardDescription>
                    Uploaded: {new Date(file.created_at).toLocaleDateString()}
                    {file.incident_date && ` | Incident: ${new Date(file.incident_date).toLocaleDateString()}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Type: {file.file_type} | Size: {(file.file_size / 1024).toFixed(2)} KB
                    </p>
                    {file.description && (
                      <p className="text-sm">{file.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="moderation" className="space-y-4">
            {flaggedPosts.map((post) => (
              <Card key={post.id} className="border-destructive/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        Posted: {new Date(post.created_at).toLocaleDateString()}
                        {post.is_anonymous && " | Anonymous"}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{post.content}</p>
                  {post.flag_reason && (
                    <div className="p-3 bg-destructive/10 rounded-lg">
                      <p className="text-sm font-medium text-destructive">Flag Reason:</p>
                      <p className="text-sm">{post.flag_reason}</p>
                    </div>
                  )}
                  <Button 
                    onClick={() => handleResolvePost(post.id)}
                    variant="outline"
                  >
                    Mark as Resolved
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
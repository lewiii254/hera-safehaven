import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle, Plus, Send, Flag, UserCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  user_id: string;
}

interface Comment {
  id: string;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  user_id: string;
}

const CommunityForum = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostAnonymous, setNewPostAnonymous] = useState(true);
  
  const [newComment, setNewComment] = useState("");
  const [newCommentAnonymous, setNewCommentAnonymous] = useState(true);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      loadComments(selectedPost.id);
    }
  }, [selectedPost]);

  const loadPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("forum_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const loadComments = async (postId: string) => {
    const { data, error } = await supabase
      .from("forum_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } else {
      setComments(data || []);
    }
  };

  const handleCreatePost = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("forum_posts").insert({
      title: newPostTitle,
      content: newPostContent,
      is_anonymous: newPostAnonymous,
      user_id: user.id,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Post created successfully",
    });

    setNewPostTitle("");
    setNewPostContent("");
    setIsCreateDialogOpen(false);
    loadPosts();
  };

  const handleAddComment = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    if (!selectedPost || !newComment.trim()) {
      toast({
        title: "Error",
        description: "Please write a comment",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.from("forum_comments").insert({
      post_id: selectedPost.id,
      content: newComment,
      is_anonymous: newCommentAnonymous,
      user_id: user.id,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
      return;
    }

    setNewComment("");
    loadComments(selectedPost.id);
  };

  const handleFlagPost = async (postId: string) => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const { error } = await supabase
      .from("forum_posts")
      .update({ 
        is_flagged: true, 
        flag_reason: "Flagged by user" 
      })
      .eq("id", postId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to flag post",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Post has been flagged for review",
    });

    loadPosts();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Community Forum</h1>
            </div>
            <p className="text-muted-foreground">
              Share experiences and support each other in a safe space
            </p>
          </div>
          
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your thoughts with the community
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Post title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your story..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    rows={6}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="anonymous"
                    checked={newPostAnonymous}
                    onCheckedChange={setNewPostAnonymous}
                  />
                  <Label htmlFor="anonymous">Post anonymously</Label>
                </div>
                <Button onClick={handleCreatePost} className="w-full">
                  Create Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">All Posts</h2>
              {posts.map((post) => (
                <Card 
                  key={post.id} 
                  className="cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => setSelectedPost(post)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFlagPost(post.id);
                        }}
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      {post.is_anonymous ? (
                        <>
                          <UserCircle className="h-4 w-4" />
                          Anonymous
                        </>
                      ) : (
                        <Badge variant="outline">User</Badge>
                      )}
                      {" • "}
                      {new Date(post.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-3">{post.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="sticky top-24 h-fit">
              {selectedPost ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedPost.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      {selectedPost.is_anonymous ? (
                        <>
                          <UserCircle className="h-4 w-4" />
                          Anonymous
                        </>
                      ) : (
                        <Badge variant="outline">User</Badge>
                      )}
                      {" • "}
                      {new Date(selectedPost.created_at).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm">{selectedPost.content}</p>
                    
                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-4">Comments ({comments.length})</h3>
                      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                              {comment.is_anonymous ? (
                                <>
                                  <UserCircle className="h-3 w-3" />
                                  Anonymous
                                </>
                              ) : (
                                <Badge variant="outline" className="h-5">User</Badge>
                              )}
                              {" • "}
                              {new Date(comment.created_at).toLocaleDateString()}
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-3">
                    <div className="flex items-center space-x-2 w-full">
                      <Switch
                        id="comment-anonymous"
                        checked={newCommentAnonymous}
                        onCheckedChange={setNewCommentAnonymous}
                      />
                      <Label htmlFor="comment-anonymous" className="text-sm">Comment anonymously</Label>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                      />
                      <Button onClick={handleAddComment} size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground">
                      Select a post to view details and comments
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityForum;
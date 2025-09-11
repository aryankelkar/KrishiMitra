import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  MapPin, 
  Calendar,
  Users,
  Bookmark,
  Send,
  Image,
  Video
} from "lucide-react";

const Community = () => {
  const [newPost, setNewPost] = useState('');
  
  const communityPosts = [
    {
      id: 1,
      author: "राम सिंह",
      location: "पंजाब, मालवा",
      time: "2 घंटे पहले",
      content: "इस साल गेहूं की फसल बहुत अच्छी हो रही है। HD-2967 किस्म का उपयोग किया है। 25 क्विंटल प्रति एकड़ की उम्मीद है। सभी किसान भाइयों को सलाह है कि फूल आने के समय सिंचाई जरूर करें। 🌾",
      likes: 24,
      comments: 8,
      category: "सफलता की कहानी",
      categoryColor: "default"
    },
    {
      id: 2,
      author: "सुनीता देवी",
      location: "हरियाणा, करनाल",
      time: "4 घंटे पहले",
      content: "चने की फसल में माहू का प्रकोप हो रहा है। किसी भाई के पास इसका जैविक उपाय है? रासायनिक दवा नहीं छिड़कना चाहती। 🤔",
      likes: 15,
      comments: 12,
      category: "सहायता चाहिए",
      categoryColor: "destructive"
    },
    {
      id: 3,
      author: "मुकेश कुमार",
      location: "उत्तर प्रदेश, मेरठ",
      time: "6 घंटे पहले",
      content: "जैविक खेती शुरू करके 3 साल हो गए। पहले डरता था कि उत्पादन कम होगा, लेकिन अब लागत कम और मुनाफा ज्यादा है। सबको सलाह है कि धीरे-धीरे जैविक की तरफ जाएं। 🌱",
      likes: 42,
      comments: 18,
      category: "जैविक खेती",
      categoryColor: "default"
    },
    {
      id: 4,
      author: "प्रीति शर्मा",
      location: "राजस्थान, जयपुर",
      time: "8 घंटे पहले",
      content: "आज के मौसम में टमाटर की खेती करने वालों को सावधान रहना चाहिए। पिछली बारिश के बाद फंगस की समस्या हो सकती है। नीम के तेल का छिड़काव करें। ⚠️",
      likes: 28,
      comments: 9,
      category: "चेतावनी",
      categoryColor: "destructive"
    }
  ];

  const categories = [
    { name: "सभी", color: "outline" },
    { name: "सफलता की कहानी", color: "default" },
    { name: "सहायता चाहिए", color: "destructive" },
    { name: "जैविक खेती", color: "secondary" },
    { name: "चेतावनी", color: "destructive" },
    { name: "नई तकनीक", color: "outline" }
  ];

  const getCategoryVariant = (color: string) => {
    switch (color) {
      case 'default': return 'default';
      case 'destructive': return 'destructive';
      case 'secondary': return 'secondary';
      default: return 'outline';
    }
  };

  const handlePost = () => {
    if (newPost.trim()) {
      // Add new post logic here
      setNewPost('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 p-4 pb-20 md:pb-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">किसान समुदाय</h1>
              <p className="text-muted-foreground">अपने अनुभव साझा करें और दूसरों से सीखें</p>
            </div>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={getCategoryVariant(category.color)}
                size="sm"
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Create Post */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">नई पोस्ट लिखें</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="अपना अनुभव, सवाल या सलाह साझा करें..."
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Image className="h-4 w-4" />
                    फोटो
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Video className="h-4 w-4" />
                    वीडियो
                  </Button>
                </div>
                <Button onClick={handlePost} disabled={!newPost.trim()} className="gap-2">
                  <Send className="h-4 w-4" />
                  पोस्ट करें
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Posts */}
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {post.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{post.author}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {post.location}
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        {post.time}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getCategoryVariant(post.categoryColor)}>
                    {post.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-relaxed mb-4">{post.content}</p>
                
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-red-500">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                      <MessageSquare className="h-4 w-4" />
                      {post.comments}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline">और पोस्ट देखें</Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
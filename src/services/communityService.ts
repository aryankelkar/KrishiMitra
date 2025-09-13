// Community service for managing posts and interactions
export interface CommunityPost {
  id: number;
  author: string;
  location: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  category: string;
  categoryColor: string;
  imageUrl?: string;
  videoUrl?: string;
  timestamp: Date;
}

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

// Mock community posts
export const getCommunityPosts = (): CommunityPost[] => {
  return [
    {
      id: 1,
      author: "राम सिंह",
      location: "पंजाब, मालवा",
      time: "2 घंटे पहले",
      content: "इस साल गेहूं की फसल बहुत अच्छी हो रही है। HD-2967 किस्म का उपयोग किया है। 25 क्विंटल प्रति एकड़ की उम्मीद है। सभी किसान भाइयों को सलाह है कि फूल आने के समय सिंचाई जरूर करें। 🌾",
      likes: 24,
      comments: 8,
      category: "सफलता की कहानी",
      categoryColor: "default",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
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
      categoryColor: "destructive",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
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
      categoryColor: "default",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
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
      categoryColor: "destructive",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
    }
  ];
};

// Create a new post
export const createPost = (postData: {
  content: string;
  category: string;
  imageUrl?: string;
  videoUrl?: string;
}): CommunityPost => {
  const newPost: CommunityPost = {
    id: Date.now(),
    author: "You", // In a real app, this would be the current user
    location: "Your Location",
    time: "अभी",
    content: postData.content,
    likes: 0,
    comments: 0,
    category: postData.category,
    categoryColor: "default",
    imageUrl: postData.imageUrl,
    videoUrl: postData.videoUrl,
    timestamp: new Date()
  };
  
  console.log('New post created:', newPost);
  return newPost;
};

// Like a post
export const likePost = (postId: number): boolean => {
  console.log(`Liked post ${postId}`);
  return true;
};

// Add comment to a post
export const addComment = (postId: number, content: string): Comment => {
  const newComment: Comment = {
    id: Date.now(),
    postId,
    author: "You",
    content,
    timestamp: new Date(),
    likes: 0
  };
  
  console.log('New comment added:', newComment);
  return newComment;
};

// Bookmark a post
export const bookmarkPost = (postId: number): boolean => {
  console.log(`Bookmarked post ${postId}`);
  return true;
};

// Share a post
export const sharePost = (postId: number): boolean => {
  console.log(`Shared post ${postId}`);
  return true;
};

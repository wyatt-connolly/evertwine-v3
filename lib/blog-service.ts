import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Timestamp | string | null; // Firestore timestamp or string for display
  image: string; // Featured image URL
  read_time: string;
  category: string;
  slug: string;
  featured: boolean; // Will be determined by frontend logic
  published: boolean;
  created_at: Timestamp;
  updated_at: Timestamp;
}

export interface BlogPostInput {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  read_time: string;
  category: string;
  slug: string;
  published?: boolean;
}

// Sample data for fallback when Firebase is not configured
const sampleBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Meaningful Connections in the Digital Age",
    slug: "building-meaningful-connections-digital-age",
    excerpt:
      "Discover how modern technology can help foster genuine relationships and community bonds in our increasingly connected world.",
    content: "Full article content here...",
    author: "Sarah Johnson",
    date: Timestamp.fromDate(new Date("2024-03-15")),
    image: "/hero-bg.webp",
    read_time: "5",
    category: "Technology",
    featured: false,
    published: true,
    created_at: Timestamp.fromDate(new Date("2024-03-15")),
    updated_at: Timestamp.fromDate(new Date("2024-03-15")),
  },
  {
    id: "2",
    title: "The Future of Social Networking",
    slug: "future-of-social-networking",
    excerpt:
      "Exploring how social platforms are evolving to prioritize authentic connections over superficial interactions.",
    content: "Full article content here...",
    author: "Mike Chen",
    date: Timestamp.fromDate(new Date("2024-03-10")),
    image: "/hero-bg.webp",
    read_time: "7",
    category: "Innovation",
    featured: false,
    published: true,
    created_at: Timestamp.fromDate(new Date("2024-03-10")),
    updated_at: Timestamp.fromDate(new Date("2024-03-10")),
  },
  {
    id: "3",
    title: "Community Building Best Practices",
    slug: "community-building-best-practices",
    excerpt:
      "Learn the essential strategies for creating and maintaining thriving online communities that last.",
    content: "Full article content here...",
    author: "Emily Rodriguez",
    date: Timestamp.fromDate(new Date("2024-03-05")),
    image: "/hero-bg.webp",
    read_time: "6",
    category: "Community",
    featured: false,
    published: true,
    created_at: Timestamp.fromDate(new Date("2024-03-05")),
    updated_at: Timestamp.fromDate(new Date("2024-03-05")),
  },
];

const COLLECTION_NAME = "blog-posts";

// Get all published blog posts, sorted by creation date (newest first)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log("🔍 Fetching blog posts from collection:", COLLECTION_NAME);
    const postsRef = collection(db, COLLECTION_NAME);

    // First, let's see ALL documents in the collection
    console.log("🔍 Checking all documents in collection...");
    const allDocsQuery = await getDocs(collection(db, COLLECTION_NAME));
    console.log("📊 Total documents in collection:", allDocsQuery.size);
    allDocsQuery.forEach((doc) => {
      console.log("📄 All docs - ID:", doc.id, "Data:", doc.data());
    });

    // Now try to get published posts
    const simpleQuery = query(postsRef, where("published", "==", true));
    const querySnapshot = await getDocs(simpleQuery);

    console.log("📊 Published posts query snapshot size:", querySnapshot.size);
    console.log(
      "📊 Published posts query snapshot empty:",
      querySnapshot.empty
    );

    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("📄 Published document data:", { id: doc.id, ...data });
      return {
        id: doc.id,
        ...data,
      } as BlogPost;
    });

    console.log("✅ Fetched published posts:", posts.length);

    // Sort posts by date on the client side if date field exists
    posts.sort((a, b) => {
      const dateA =
        a.date && a.date instanceof Timestamp
          ? a.date.toDate()
          : a.created_at instanceof Timestamp
            ? a.created_at.toDate()
            : new Date();
      const dateB =
        b.date && b.date instanceof Timestamp
          ? b.date.toDate()
          : b.created_at instanceof Timestamp
            ? b.created_at.toDate()
            : new Date();
      return dateB.getTime() - dateA.getTime();
    });

    return posts;
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error);

    // Return sample data if Firebase is not configured or has permission issues
    console.warn("Using sample blog data due to Firebase configuration issue");
    return sampleBlogPosts;
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const postsRef = collection(db, COLLECTION_NAME);
    const q = query(
      postsRef,
      where("slug", "==", slug),
      where("published", "==", true)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Check sample data as fallback
      const samplePost = sampleBlogPosts.find((post) => post.slug === slug);
      return samplePost || null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as BlogPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);

    // Return sample data if Firebase is not configured or has permission issues
    console.warn("Using sample blog data due to Firebase configuration issue");
    const samplePost = sampleBlogPosts.find((post) => post.slug === slug);
    return samplePost || null;
  }
}

// Create a new blog post
export async function createBlogPost(
  postData: BlogPostInput
): Promise<string | null> {
  try {
    console.log("🚀 Attempting to create blog post with data:", postData);
    console.log("📍 Collection name:", COLLECTION_NAME);
    console.log("🔥 Firebase db instance:", db);

    const now = serverTimestamp();
    console.log("⏰ Server timestamp:", now);

    const docData = {
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      author: postData.author,
      image: postData.image,
      read_time: postData.read_time,
      category: postData.category,
      slug: postData.slug,
      published: postData.published ?? true,
      date: now, // Add the date field for sorting
      created_at: now,
      updated_at: now,
    };
    console.log("📄 Document data to be saved:", docData);

    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    console.log("✅ Successfully created blog post with ID:", docRef.id);

    return docRef.id;
  } catch (error: unknown) {
    console.error("❌ Error creating blog post:", error);
    const firebaseError = error as { code?: string; message?: string };
    console.error("❌ Error code:", firebaseError?.code);
    console.error("❌ Error message:", firebaseError?.message);
    console.error("❌ Full error object:", JSON.stringify(error, null, 2));
    return null;
  }
}

// Update an existing blog post
export async function updateBlogPost(
  id: string,
  updates: Partial<BlogPostInput>
): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      updated_at: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error updating blog post:", error);
    return false;
  }
}

// Delete a blog post
export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return false;
  }
}

// Helper function to format Firestore timestamp for display
export function formatBlogDate(timestamp: Timestamp | string | null): string {
  if (!timestamp) {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (typeof timestamp === "string") {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to create slug from title
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Upload image to Firebase Storage
export async function uploadBlogImage(file: File): Promise<string | null> {
  try {
    console.log("🚀 Uploading image:", file.name);

    // Create a unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const fileName = `blog-image-${timestamp}.${extension}`;

    // Create a reference to the file location
    const storageRef = ref(storage, `blog-images/${fileName}`);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    console.log("✅ Image uploaded successfully");

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("✅ Download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("❌ Error uploading image:", error);
    return null;
  }
}

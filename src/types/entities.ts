export type ProjectStatus = "draft" | "private" | "public" | "featured" | "archived";

export interface UserEntity {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectEntity {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  status: ProjectStatus;
  completionPercentage: number;
  featured: boolean;
  heroImageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSectionEntity {
  id: string;
  projectId: string;
  type: string;
  title: string | null;
  content: Record<string, unknown>;
  position: number;
}

export interface GalleryItemEntity {
  id: string;
  projectId: string;
  mediaAssetId: string | null;
  mediaType: string;
  caption: string | null;
  position: number;
}

export interface ProjectFeatureEntity {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  icon: string | null;
  position: number;
}

export interface ProjectTimelineEntity {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  occurredAt: string | null;
  position: number;
}

export interface ProjectDownloadEntity {
  id: string;
  projectId: string;
  mediaAssetId: string | null;
  label: string;
  url: string;
}

export interface TestimonialEntity {
  id: string;
  projectId: string | null;
  clientName: string;
  clientRole: string | null;
  company: string | null;
  quote: string;
  rating: number;
  featured: boolean;
}

export interface BlogCategoryEntity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface BlogPostEntity {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  contentMarkdown: string;
  coverImageUrl: string | null;
  categoryId: string | null;
  tags: string[];
  isPublished: boolean;
  publishedAt: string | null;
}

export interface ContactMessageEntity {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  metadata: Record<string, unknown>;
}

export interface AnalyticsEntity {
  id: string;
  eventName: string;
  projectId: string | null;
  sessionId: string | null;
  countryCode: string | null;
  deviceType: string | null;
  referrer: string | null;
  payload: Record<string, unknown>;
}

export interface ProjectShareEntity {
  id: string;
  projectId: string;
  shareId: string;
  passwordHash: string | null;
  expiresAt: string | null;
  isActive: boolean;
}

export interface MediaAssetEntity {
  id: string;
  filename: string;
  mimeType: string;
  storageBucket: string;
  storagePath: string;
  sizeBytes: number;
  altText: string | null;
  tags: string[];
}

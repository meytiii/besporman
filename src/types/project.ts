// src/types/project.ts

export type ProjectCategory = 'web' | 'telegram-bot' | 'windows-app';

export type ProjectStatus = 'verified' | 'in-progress' | 'archived';

export interface ProjectItem {
  // --- Mandatory Core Fields (Required to render every project card) ---
  id: string;                                // Stable identifier (e.g. 'prj-01')
  slug: string;                              // URL slug for routing (e.g. 'warehouse-bot')
  titleFa: string;                           // Authentic Persian project title
  category: ProjectCategory;                 // Category mapping
  summaryFa: string;                         // 1-2 sentence honest summary
  status: ProjectStatus;                     // Verification status

  // --- Optional Metadata (Gracefully omitted when absent) ---
  featuredImage?: string;                    // Screenshot (fallback category plate used if undefined)
  galleryImages?: string[];                  // Additional screenshots (block omitted if empty)
  completedYearFa?: string;                  // e.g. '۱۴۰۲'
  clientNameFa?: string;                     // Client name (omitted if confidential/internal)
  technologies?: string[];                   // e.g. ['Vue 3', 'Python', 'SQLite']
  externalUrl?: string;                      // Live public link (button hidden if absent)
  telegramUrl?: string;                      // Direct t.me bot link (button hidden if absent)
  caseStudyMarkdownFa?: string;              // Detailed writeup (fallback to summary if absent)
  keyHighlightsFa?: string[];                // Bulleted deliverables (rendered if present)
}

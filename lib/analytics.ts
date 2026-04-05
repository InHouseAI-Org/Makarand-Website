/**
 * Google Analytics Event Tracking Utilities
 *
 * Use these functions to track custom events throughout your application.
 * Events are automatically sent to Google Analytics 4.
 */

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Pre-defined event tracking functions for common actions

export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', {
    form_name: formName,
    success: success,
  });
};

export const trackProjectView = (projectTitle: string, projectId: string) => {
  trackEvent('project_view', {
    project_title: projectTitle,
    project_id: projectId,
  });
};

export const trackMediaView = (mediaType: 'image' | 'video', mediaTitle: string) => {
  trackEvent('media_view', {
    media_type: mediaType,
    media_title: mediaTitle,
  });
};

export const trackEventRegistration = (eventTitle: string, eventId: string) => {
  trackEvent('event_registration', {
    event_title: eventTitle,
    event_id: eventId,
  });
};

export const trackSocialShare = (platform: string, content: string) => {
  trackEvent('social_share', {
    platform: platform,
    content: content,
  });
};

export const trackWhatsAppClick = (context: string) => {
  trackEvent('whatsapp_click', {
    context: context,
  });
};

export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
  });
};

export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

export const trackOutboundLink = (url: string, linkText: string) => {
  trackEvent('outbound_link', {
    url: url,
    link_text: linkText,
  });
};

export const trackVideoPlay = (videoTitle: string, videoId: string) => {
  trackEvent('video_play', {
    video_title: videoTitle,
    video_id: videoId,
  });
};

export const trackContactSubmission = (category: string) => {
  trackEvent('contact_submission', {
    category: category,
  });
};

// Track page engagement time
let startTime = 0;

export const startEngagementTracking = () => {
  startTime = Date.now();
};

export const endEngagementTracking = (pageName: string) => {
  if (startTime) {
    const duration = Math.round((Date.now() - startTime) / 1000); // in seconds
    trackEvent('page_engagement', {
      page_name: pageName,
      duration_seconds: duration,
    });
    startTime = 0;
  }
};

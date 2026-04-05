import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * Dynamic Open Graph Image Generation
 * Generate custom OG images on-the-fly for social media sharing
 *
 * Usage: /api/og?title=Your Title&description=Description&type=default
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract parameters
    const title = searchParams.get('title') || 'Makarand Narwekar';
    const description = searchParams.get('description') || 'Mumbai Corporator | Transforming Communities';
    const type = searchParams.get('type') || 'default'; // default, project, press, award
    const category = searchParams.get('category') || '';

    // Define colors
    const bgColor = '#1a1a1a';
    const primaryColor = '#FF6B6B';
    const textColor = '#ffffff';
    const secondaryColor = '#9CA3AF';

    // Determine badge based on type
    let badge = '';
    let badgeColor = primaryColor;

    switch (type) {
      case 'project':
        badge = 'Project';
        badgeColor = '#10B981';
        break;
      case 'press':
        badge = 'Press Coverage';
        badgeColor = '#3B82F6';
        break;
      case 'award':
        badge = 'Award';
        badgeColor = '#F59E0B';
        break;
      case 'government':
        badge = 'Government Project';
        badgeColor = '#8B5CF6';
        break;
      case 'youth':
        badge = 'Youth Program';
        badgeColor = '#EC4899';
        break;
      default:
        badge = category || 'Official';
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: bgColor,
            padding: '80px',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          {/* Top Section - Badge */}
          {badge && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: badgeColor,
                color: textColor,
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '24px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {badge}
            </div>
          )}

          {/* Middle Section - Title & Description */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              maxWidth: '90%',
            }}
          >
            <h1
              style={{
                fontSize: '64px',
                fontWeight: '800',
                color: textColor,
                lineHeight: '1.2',
                margin: 0,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: '32px',
                fontWeight: '400',
                color: secondaryColor,
                lineHeight: '1.4',
                margin: 0,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {description}
            </p>
          </div>

          {/* Bottom Section - Branding */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: `3px solid ${primaryColor}`,
              paddingTop: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {/* Logo/Icon placeholder */}
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: primaryColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: '800',
                  color: textColor,
                }}
              >
                M
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: textColor,
                  }}
                >
                  Makarand Narwekar
                </span>
                <span
                  style={{
                    fontSize: '20px',
                    fontWeight: '400',
                    color: secondaryColor,
                  }}
                >
                  Mumbai Corporator | BJP
                </span>
              </div>
            </div>

            <div
              style={{
                fontSize: '24px',
                color: secondaryColor,
              }}
            >
              makarandnarwekar.com
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG Image generation error:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

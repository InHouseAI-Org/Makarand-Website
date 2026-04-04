'use client';

import { Award } from "lucide-react";
import { useRouter } from "next/navigation";

interface AwardCardProps {
  id?: string;
  title: string;
  org: string;
  year: string;
  description: string;
  image?: string;
}

export function AwardCard({ id, title, org, year, description, image }: AwardCardProps) {
  const router = useRouter();



  const handleClick = () => {

    if (id) {

      router.push(`/media/award/${id}`);
    } else {

    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white overflow-hidden border border-border hover:shadow-lg transition-all group ${
        id ? 'cursor-pointer' : 'opacity-75'
      }`}
      style={{ borderRadius: "28px" }}
      role={id ? "button" : undefined}
      tabIndex={id ? 0 : undefined}
    >
      {/* Award Image */}
      {image ? (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
            <Award className="w-10 h-10 text-coral" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-coral-light flex items-center justify-center group-hover:scale-110 transition-transform">
            <Award className="w-5 h-5 text-coral" />
          </div>
          <span className="text-coral" style={{ fontSize: "12px", fontWeight: 700 }}>
            {year}
          </span>
        </div>
        <h4
          className="text-charcoal mb-2 group-hover:text-coral transition-colors"
          style={{ fontSize: "17px", fontWeight: 700 }}
        >
          {title}
        </h4>
        <p className="text-charcoal-light mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>
          {org}
        </p>
        <p className="text-charcoal-light line-clamp-3" style={{ fontSize: "14px", lineHeight: "1.6" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

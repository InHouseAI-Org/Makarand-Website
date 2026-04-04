'use client';


export function WardAMap() {
  return (
      <div className="p-6">
        <div className="relative rounded-xl overflow-hidden border-2 border-border bg-cream">
          <iframe
            width="100%"
            height="450"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.7767848968506%2C18.88988327041683%2C72.90295600891115%2C18.951671193352123&amp;layer=mapnik"
            style={{ border: 0 }}
            title="Ward A Mumbai Map"
            className="w-full"
          />
        </div>
      </div>
  );
}
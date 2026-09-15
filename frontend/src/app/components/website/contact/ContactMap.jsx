export default function ContactMap() {
  return (
    <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-sm">
      <iframe
        title="Nestro showroom location"
        className="h-full w-full border-0"
        loading="lazy"
        src="https://maps.google.com/maps?q=Jaipur%2C%20Rajasthan&t=&z=13&ie=UTF8&iwloc=&output=embed"
      />
    </div>
  );
}

import { ComponentConfig } from '@measured/puck'

const DEFAULT_PROPERTIES = [
  {
    id: '1',
    address: '2847 Oakwood Drive',
    city: 'Pasadena, CA 91107',
    beds: 3,
    baths: 2,
    sqft: 1850,
    rent: 3200,
    status: 'Leased',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    tag: 'Single Family',
  },
  {
    id: '2',
    address: '1142 Pacific Avenue #4B',
    city: 'Long Beach, CA 90813',
    beds: 2,
    baths: 1,
    sqft: 980,
    rent: 2100,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tag: 'Condo',
  },
  {
    id: '3',
    address: '5523 Sunset Terrace',
    city: 'Riverside, CA 92506',
    beds: 4,
    baths: 3,
    sqft: 2400,
    rent: 3800,
    status: 'Leased',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    tag: 'Single Family',
  },
]

type Props = { title?: string }

export const PropertyShowcase: ComponentConfig<Props> = {
  label: 'Property Showcase',
  fields: { title: { type: 'text', label: 'Section Title' } },
  defaultProps: { title: 'Properties We Manage' },
  render: ({ title }) => (
    <section className="bg-[#070707] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#C9A650] text-xs tracking-[0.3em] uppercase mb-2">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
          </div>
          <a href="#contact" className="text-white/40 text-sm border-b border-white/20 pb-1 hover:text-[#C9A650] hover:border-[#C9A650] transition-colors hidden md:block">View All Properties &rarr;</a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {DEFAULT_PROPERTIES.map(({ id, address, city, beds, baths, sqft, rent, status, image, tag }) => (
            <div key={id} className="group cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/3] mb-4">
                <img
                  src={image}
                  alt={address}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/60 backdrop-blur-sm text-white/80 text-xs px-3 py-1">{tag}</span>
                  <span className={`text-xs px-3 py-1 ${
                    status === 'Available' ? 'bg-[#C9A650] text-black' : 'bg-white/10 text-white/60'
                  }`}>{status}</span>
                </div>
              </div>
              <div>
                <p className="text-white font-medium mb-1">{address}</p>
                <p className="text-white/40 text-sm mb-3">{city}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-white/50 text-sm">
                    <span>{beds} bd</span>
                    <span>{baths} ba</span>
                    <span>{sqft.toLocaleString()} sf</span>
                  </div>
                  <span className="text-[#C9A650] font-medium">${rent.toLocaleString()}/mo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
}

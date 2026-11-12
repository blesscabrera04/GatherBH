import BusinessPortal from "./BusinessPortal";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

type Page = "home" | "auth" | "browse" | "details" | "claim" | "claims" | "business";
type AuthMode = "login" | "register";
type AccountType = "customer" | "business";
type Category = "Dining" | "Cinema" | "Recreation";
type ClaimStatus = "Pending" | "Approved" | "Rejected";

type MarketplaceOffer = {
  id: string;
  business: string;
  title: string;
  category: Category;
  location: string;
  price: number;
  minGroup: number;
  maxGroup: number;
  image: string;
  description: string;
  terms: string[];
};

type CustomerClaim = {
  reference: string;
  offerId: string;
  activity: string;
  business: string;
  participants: number;
  date: string;
  status: ClaimStatus;
};

const photos = {
  dining:
    "https://images.unsplash.com/photo-1699730148132-1409a3728479?auto=format&fit=crop&w=1400&q=85",
  cinema:
    "https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?auto=format&fit=crop&w=1200&q=85",
  recreation:
    "https://images.unsplash.com/photo-1763819527303-54f4dee70709?auto=format&fit=crop&w=1200&q=85",
  food: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  celebration:
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=85",
};

const categories = [
  {
    title: "Dining",
    description: "Shared tables, better tastes",
    image: photos.dining,
    count: "24 offers",
  },
  {
    title: "Cinema",
    description: "Big screens, bigger memories",
    image: photos.cinema,
    count: "12 offers",
  },
  {
    title: "Recreation",
    description: "Play, laugh, repeat",
    image: photos.recreation,
    count: "18 offers",
  },
];

const deals = [
  {
    title: "The Long Table Brunch",
    venue: "Saffron by Jena",
    category: "Dining",
    image: photos.food,
    price: "BHD 12",
    oldPrice: "BHD 18",
    group: "4–8 people",
    badge: "Save 33%",
  },
  {
    title: "Movie Night Bundle",
    venue: "Cineco Seef",
    category: "Cinema",
    image: photos.cinema,
    price: "BHD 16",
    oldPrice: "BHD 24",
    group: "4 people",
    badge: "Popular",
  },
  {
    title: "Strike & Share",
    venue: "Funscape Bahrain",
    category: "Recreation",
    image: photos.recreation,
    price: "BHD 20",
    oldPrice: "BHD 30",
    group: "Up to 6",
    badge: "Save 35%",
  },
];

const marketplaceOffers: MarketplaceOffer[] = [
  {
    id: "saffron-table",
    business: "Saffron Stories",
    title: "The Shared Table Brunch",
    category: "Dining",
    location: "Manama",
    price: 48,
    minGroup: 4,
    maxGroup: 6,
    image:
      "https://images.unsplash.com/photo-1699730148132-1409a3728479?auto=format&fit=crop&w=1400&q=85",
    description:
      "A generous weekend spread designed for sharing, with vibrant starters, signature mains, handmade desserts, and unlimited house refreshments in a warm, modern dining room.",
    terms: [
      "Available Thursday to Saturday from 12:00 PM to 4:00 PM.",
      "Advance reservation of at least 24 hours is required.",
      "Offer applies to one table and cannot be combined with other promotions.",
    ],
  },
  {
    id: "moonlight-movies",
    business: "Moonlight Screens",
    title: "Big Screen Night Bundle",
    category: "Cinema",
    location: "Seef",
    price: 32,
    minGroup: 4,
    maxGroup: 6,
    image:
      "https://images.unsplash.com/photo-1608170825938-a8ea0305d46c?auto=format&fit=crop&w=1400&q=85",
    description:
      "Settle into premium reclining seats for the latest release. Your group bundle includes tickets, two large popcorns, and a round of chilled drinks.",
    terms: [
      "Valid Sunday to Wednesday, excluding public holidays.",
      "Premium formats and special screenings may require an upgrade fee.",
      "Claim reference must be presented at the box office.",
    ],
  },
  {
    id: "alley-nine",
    business: "Alley Nine",
    title: "Strike & Share",
    category: "Recreation",
    location: "Juffair",
    price: 36,
    minGroup: 4,
    maxGroup: 8,
    image:
      "https://images.unsplash.com/photo-1763819527303-54f4dee70709?auto=format&fit=crop&w=1400&q=85",
    description:
      "Two lively hours of bowling on a private lane, complete with shoe hire, a sharing platter, and plenty of friendly competition.",
    terms: [
      "Valid daily before 8:00 PM, subject to lane availability.",
      "Bowling shoes are included for all registered participants.",
      "Additional games and menu items are charged separately.",
    ],
  },
  {
    id: "tide-bahrain",
    business: "Tide Bahrain",
    title: "Sunset Kayak Social",
    category: "Recreation",
    location: "Amwaj",
    price: 60,
    minGroup: 4,
    maxGroup: 10,
    image:
      "https://images.unsplash.com/photo-1671550363244-eaaae0b16d43?auto=format&fit=crop&w=1400&q=85",
    description:
      "Paddle across calm island waters as the sun dips over the horizon. A friendly guide, equipment, safety briefing, and post-paddle refreshments are included.",
    terms: [
      "Participants must be aged 12 or above and able to swim.",
      "Activity may be rescheduled in unsafe weather conditions.",
      "Comfortable sportswear and a change of clothes are recommended.",
    ],
  },
  {
    id: "clay-house",
    business: "Clay House Studio",
    title: "Make Your Own Mug",
    category: "Recreation",
    location: "Muharraq",
    price: 45,
    minGroup: 3,
    maxGroup: 6,
    image:
      "https://images.unsplash.com/photo-1780751379328-9271686e4e06?auto=format&fit=crop&w=1400&q=85",
    description:
      "Slow down with a guided hand-building pottery session. Each guest shapes and decorates a personal mug, ready for collection after glazing and firing.",
    terms: [
      "Finished pieces are available for collection within 14 days.",
      "All clay, tools, glazing, and firing are included.",
      "Sessions begin promptly; late arrivals may have less studio time.",
    ],
  },
  {
    id: "cipher-room",
    business: "Cipher BH",
    title: "The Neon Heist",
    category: "Recreation",
    location: "Seef",
    price: 50,
    minGroup: 4,
    maxGroup: 8,
    image:
      "https://images.unsplash.com/photo-1709483071040-eddd07754784?auto=format&fit=crop&w=1400&q=85",
    description:
      "Your crew has sixty minutes to crack the vault. Follow hidden clues through a cinematic neon world and see if your teamwork can beat the clock.",
    terms: [
      "Recommended for ages 15 and above.",
      "Groups arriving more than 15 minutes late may lose their slot.",
      "Photography and recording are not allowed inside the room.",
    ],
  },
  {
    id: "juniper-table",
    business: "Juniper Table",
    title: "Afternoon Tea Circle",
    category: "Dining",
    location: "Riffa",
    price: 42,
    minGroup: 3,
    maxGroup: 6,
    image:
      "https://images.unsplash.com/photo-1543603819-cb2d1c267265?auto=format&fit=crop&w=1400&q=85",
    description:
      "An elegant tower of savoury bites, warm scones, petite sweets, and specialty tea served in a light-filled garden lounge.",
    terms: [
      "Available daily between 2:00 PM and 6:00 PM.",
      "Please advise the venue of dietary needs when booking.",
      "Cake message personalization is available with 24 hours notice.",
    ],
  },
  {
    id: "ember-room",
    business: "Ember Room",
    title: "Korean Grill Feast",
    category: "Dining",
    location: "Juffair",
    price: 65,
    minGroup: 5,
    maxGroup: 10,
    image:
      "https://images.unsplash.com/photo-1581954548122-4dff8989c0f7?auto=format&fit=crop&w=1400&q=85",
    description:
      "Gather around the grill for marinated cuts, colourful banchan, steaming rice, and house-made sauces in a social feast built for sharing.",
    terms: [
      "Valid for dinner from Sunday through Thursday.",
      "One complimentary refill of selected side dishes is included.",
      "Unused portions cannot be packed for takeaway.",
    ],
  },
  {
    id: "projector-rooftop",
    business: "The Projector",
    title: "Rooftop Movie Evening",
    category: "Cinema",
    location: "Manama",
    price: 40,
    minGroup: 4,
    maxGroup: 8,
    image:
      "https://images.unsplash.com/photo-1620177088258-c84147ee601f?auto=format&fit=crop&w=1400&q=85",
    description:
      "Watch a cult favourite under the city lights from reserved lounge seating, with blankets, fresh popcorn, and a signature mocktail for every guest.",
    terms: [
      "Screenings are weather dependent and may be moved indoors.",
      "Film selection varies weekly and is confirmed after claiming.",
      "Outside food and beverages are not permitted.",
    ],
  },
  {
    id: "pixel-yard",
    business: "Pixel Yard",
    title: "Unlimited Arcade Hour",
    category: "Recreation",
    location: "Isa Town",
    price: 30,
    minGroup: 3,
    maxGroup: 6,
    image:
      "https://images.unsplash.com/photo-1558273246-57d22047406d?auto=format&fit=crop&w=1400&q=85",
    description:
      "Take over a retro-modern arcade for an hour of unlimited play, from racing simulators and air hockey to classic cabinets and rhythm games.",
    terms: [
      "Prize and redemption games are not included.",
      "Offer is valid before 9:00 PM every day.",
      "Each participant receives one refreshment voucher.",
    ],
  },
];

const initialDemoClaims: CustomerClaim[] = [
  {
    reference: "GBH-2418",
    offerId: "moonlight-movies",
    activity: "Big Screen Night Bundle",
    business: "Moonlight Screens",
    participants: 4,
    date: "18 May 2025",
    status: "Approved",
  },
  {
    reference: "GBH-1937",
    offerId: "juniper-table",
    activity: "Afternoon Tea Circle",
    business: "Juniper Table",
    participants: 5,
    date: "02 May 2025",
    status: "Rejected",
  },
];

function Icon({
  children,
  size = 20,
  className = "",
}: {
  children: ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

const Arrow = ({ className = "" }: { className?: string }) => (
  <Icon className={className}>
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </Icon>
);

const SearchIcon = () => (
  <Icon>
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
  </Icon>
);

const UsersIcon = () => (
  <Icon size={17}>
    <path
      d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 10.5A3.5 3.5 0 1 0 10 3a3.5 3.5 0 0 0 0 7.5ZM17 8a3 3 0 0 1 0 5.8M18 14.5a3.5 3.5 0 0 1 2 3V19"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.7"
    />
  </Icon>
);

function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <button
      aria-label="Gather BH home"
      className={`logo ${light ? "logo-light" : ""}`}
      onClick={onClick ?? (() => window.scrollTo({ top: 0, behavior: "smooth" }))}
    >
      <span className="logo-mark">
        <span />
        <span />
        <span />
      </span>
      <span>Gather</span>
      <b>BH</b>
    </button>
  );
}

function Header({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const goTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          <button onClick={() => onNavigate("home")}>Home</button>
          <button onClick={() => onNavigate("browse")}>Explore Deals</button>
          <button onClick={() => onNavigate("business")}>Business Demo</button>
          <button onClick={() => goTo("how-it-works")}>How It Works</button>
          <button className="mobile-login" onClick={() => onNavigate("auth")}>
            Login / Sign Up
          </button>
        </nav>
        <button className="login-button" onClick={() => onNavigate("auth")}>
          Login / Sign Up <Arrow />
        </button>
        <button
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          className={`menu-button ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Hero({ onExplore }: { onExplore: () => void }) {
  const surprise = () => {
    const card =
      document.querySelectorAll<HTMLElement>(".deal-card")[
        Math.floor(Math.random() * deals.length)
      ];
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
    card?.classList.add("surprised");
    window.setTimeout(() => card?.classList.remove("surprised"), 1200);
  };

  return (
    <section className="hero section-shell" id="home">
      <div className="hero-copy">
        <div className="eyebrow">
          <span /> Bahrain’s group activity guide
        </div>
        <h1>
          Better plans.
          <br />
          Better deals.
          <br />
          <em>Better together.</em>
        </h1>
        <p>
          Discover exciting group activities, compare exclusive deals, and make every outing
          unforgettable.
        </p>
        <div className="hero-actions">
          <button className="primary-button" onClick={onExplore}>
            Explore Deals <Arrow />
          </button>
          <button className="secondary-button" onClick={surprise}>
            <Icon>
              <path
                d="M12 3l1.1 3.9L17 8l-3.9 1.1L12 13l-1.1-3.9L7 8l3.9-1.1L12 3ZM18.5 13l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3ZM5.5 14l.8 2.7 2.7.8-2.7.8L5.5 21l-.8-2.7-2.7-.8 2.7-.8.8-2.7Z"
                fill="currentColor"
              />
            </Icon>
            Surprise Me
          </button>
        </div>
        <div className="hero-proof">
          <div className="avatar-stack">
            {[photos.celebration, photos.dining, photos.cinema].map((src) => (
              <img alt="" key={src} src={src} />
            ))}
            <span>+2k</span>
          </div>
          <p>
            <strong>4.9</strong> average rating
            <br />
            <span>from happy group planners</span>
          </p>
        </div>
      </div>

      <div className="hero-collage" aria-label="Friends enjoying activities together">
        <div className="collage-main">
          <img alt="Friends enjoying dinner together" src={photos.dining} />
          <span className="photo-label">Dinner with the whole crew</span>
        </div>
        <div className="collage-side top">
          <img alt="Friends enjoying cinema snacks" src={photos.cinema} />
        </div>
        <div className="collage-side bottom">
          <img alt="Colourful bowling alley" src={photos.recreation} />
        </div>
        <div className="floating-deal">
          <span>Group deal</span>
          <strong>Save up to 35%</strong>
          <small>when you book together</small>
        </div>
        <div className="lavender-orbit" />
      </div>
    </section>
  );
}

function SearchBar({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  return (
    <div className="search-wrap">
      <div className="search-bar">
        <SearchIcon />
        <input
          aria-label="Search activities"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="What would your group love to do?"
          value={query}
        />
        <button
          onClick={() => document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" })}
        >
          Search activities
        </button>
      </div>
      <div className="quick-search">
        <span>Popular:</span>
        {["Brunch", "Movie night", "Bowling"].map((item) => (
          <button key={item} onClick={() => setQuery(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Categories({ setQuery }: { setQuery: (value: string) => void }) {
  return (
    <section className="section-shell section-space">
      <div className="section-heading">
        <div>
          <div className="eyebrow">
            <span /> Explore by mood
          </div>
          <h2>Something for every group</h2>
        </div>
        <p>
          From laid-back dinners to competitive nights out, find a plan everyone will say yes to.
        </p>
      </div>
      <div className="category-grid">
        {categories.map((category, index) => (
          <button
            className="category-card"
            key={category.title}
            onClick={() => {
              setQuery(category.title);
              document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img alt={`${category.title} group activity`} src={category.image} />
            <div className="category-overlay" />
            <span className="category-number">0{index + 1}</span>
            <div className="category-content">
              <small>{category.count}</small>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
            <span className="category-arrow">
              <Arrow />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Deals({ query, setQuery }: { query: string; setQuery: (value: string) => void }) {
  const [saved, setSaved] = useState<string[]>([]);
  const [claimed, setClaimed] = useState<string | null>(null);
  const visibleDeals = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized || ["brunch", "movie night", "bowling"].includes(normalized)) return deals;
    return deals.filter((deal) =>
      `${deal.title} ${deal.venue} ${deal.category}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <section className="deals-section" id="deals">
      <div className="section-shell">
        <div className="section-heading deals-heading">
          <div>
            <div className="eyebrow light">
              <span /> Handpicked for your crew
            </div>
            <h2>Featured group offers</h2>
          </div>
          <button onClick={() => setQuery("")}>
            View all offers <Arrow />
          </button>
        </div>
        {visibleDeals.length === 0 ? (
          <div className="empty-state">
            <h3>No exact matches yet</h3>
            <p>Try dining, cinema, or recreation to see our featured offers.</p>
            <button className="primary-button" onClick={() => setQuery("")}>
              Show all deals
            </button>
          </div>
        ) : (
          <div className="deals-grid">
            {visibleDeals.map((deal) => (
              <article className="deal-card" key={deal.title}>
                <div className="deal-image">
                  <img alt={deal.title} src={deal.image} />
                  <span className="deal-badge">{deal.badge}</span>
                  <button
                    aria-label={`${saved.includes(deal.title) ? "Remove" : "Save"} ${deal.title}`}
                    className={`heart ${saved.includes(deal.title) ? "saved" : ""}`}
                    onClick={() =>
                      setSaved((current) =>
                        current.includes(deal.title)
                          ? current.filter((title) => title !== deal.title)
                          : [...current, deal.title],
                      )
                    }
                  >
                    <Icon>
                      <path
                        d="M20.8 5.8a5.2 5.2 0 0 0-7.4 0L12 7.2l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 22l8.8-8.8a5.2 5.2 0 0 0 0-7.4Z"
                        fill={saved.includes(deal.title) ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                      />
                    </Icon>
                  </button>
                </div>
                <div className="deal-body">
                  <div className="deal-meta">
                    <span>{deal.category}</span>
                    <span>
                      <UsersIcon /> {deal.group}
                    </span>
                  </div>
                  <h3>{deal.title}</h3>
                  <p>{deal.venue}</p>
                  <div className="deal-footer">
                    <div>
                      <small>From</small>
                      <strong>{deal.price}</strong>
                      <del>{deal.oldPrice}</del>
                    </div>
                    <button onClick={() => setClaimed(deal.title)}>
                      Claim offer <Arrow />
                    </button>
                  </div>
                  {claimed === deal.title && (
                    <div className="claim-toast">
                      Offer held for you. Sign in to complete your claim.
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Explore",
      text: "Browse activities and deals curated for groups across Bahrain.",
    },
    {
      number: "02",
      title: "Choose",
      text: "Compare the details and find the offer that fits your whole crew.",
    },
    {
      number: "03",
      title: "Claim",
      text: "Secure your deal in a few taps, then show up and enjoy together.",
    },
  ];
  return (
    <section className="how-section section-shell" id="how-it-works">
      <div className="how-intro">
        <div className="eyebrow">
          <span /> Simple by design
        </div>
        <h2>
          Your next great plan,
          <br />
          sorted in minutes.
        </h2>
        <p>
          No endless group chats. No hunting across apps. Gather BH brings the best group
          experiences into one beautiful place.
        </p>
        <div className="mini-stat">
          <strong>54+</strong>
          <span>
            group offers
            <br />
            across Bahrain
          </span>
        </div>
      </div>
      <div className="steps">
        {steps.map((step, index) => (
          <div className="step" key={step.number}>
            <span className="step-number">{step.number}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
            {index < steps.length - 1 && <div className="step-line" />}
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer({ onAuth }: { onAuth: () => void }) {
  return (
    <footer>
      <div className="footer-cta section-shell">
        <div>
          <span>Ready when your group is</span>
          <h2>
            Make this week one
            <br />
            to remember.
          </h2>
        </div>
        <button
          className="footer-button"
          onClick={() => document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" })}
        >
          Find your next plan <Arrow />
        </button>
      </div>
      <div className="footer-main">
        <div className="section-shell footer-grid">
          <div className="footer-brand">
            <Logo light />
            <p>
              Bahrain’s home for better group plans, exclusive offers, and time well spent together.
            </p>
          </div>
          <div>
            <h4>Discover</h4>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</button>
            <button
              onClick={() =>
                document.getElementById("deals")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore deals
            </button>
            <button
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              How it works
            </button>
          </div>
          <div>
            <h4>For business</h4>
            <button onClick={onAuth}>List your business</button>
            <button onClick={onAuth}>Partner login</button>
            <button>Support</button>
          </div>
          <div>
            <h4>Stay in the loop</h4>
            <p>Fresh plans and group deals, delivered.</p>
            <div className="newsletter">
              <input aria-label="Email for newsletter" placeholder="Your email" type="email" />
              <button aria-label="Subscribe">
                <Arrow />
              </button>
            </div>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© 2026 Gather BH. Made in Bahrain.</span>
          <span>Privacy &nbsp;&nbsp; Terms</span>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [query, setQuery] = useState("");
  const explore = () => onNavigate("browse");
  return (
    <>
      <Header onNavigate={onNavigate} />
      <main>
        <Hero onExplore={explore} />
        <div className="section-shell">
          <SearchBar query={query} setQuery={setQuery} />
        </div>
        <Categories setQuery={setQuery} />
        <Deals query={query} setQuery={setQuery} />
        <HowItWorks />
      </main>
      <Footer onAuth={() => onNavigate("auth")} />
    </>
  );
}

function CustomerHeader({ page, onNavigate }: { page: Page; onNavigate: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const go = (nextPage: Page) => {
    setOpen(false);
    onNavigate(nextPage);
  };
  return (
    <header className="customer-header">
      <div className="customer-nav section-shell">
        <Logo onClick={() => go("home")} />
        <nav className={open ? "open" : ""} aria-label="Customer navigation">
          <button onClick={() => go("home")}>Home</button>
          <button
            className={["browse", "details", "claim"].includes(page) ? "active" : ""}
            onClick={() => go("browse")}
          >
            Explore Deals
          </button>
          <button className={page === "claims" ? "active" : ""} onClick={() => go("claims")}>
            My Claims
          </button>
        </nav>
        <button className="customer-account" onClick={() => go("auth")}>
          <span>LM</span>
          <div>
            <strong>Layla</strong>
            <small>Customer</small>
          </div>
        </button>
        <button
          className={`menu-button ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function SelectChevron() {
  return (
    <Icon size={15}>
      <path
        d="m7 9 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </Icon>
  );
}

function MarketplaceCard({
  offer,
  onView,
}: {
  offer: MarketplaceOffer;
  onView: (offer: MarketplaceOffer) => void;
}) {
  return (
    <article className="market-card">
      <div className="market-card-image">
        <img src={offer.image} alt={offer.title} />
        <span>{offer.category}</span>
        <small>{offer.location}</small>
      </div>
      <div className="market-card-body">
        <p>{offer.business}</p>
        <h3>{offer.title}</h3>
        <div className="market-location">
          <Icon size={15}>
            <path
              d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
          </Icon>
          {offer.location}, Bahrain
        </div>
        <div className="market-price">
          <div>
            <small>Total group price</small>
            <strong>BHD {offer.price}</strong>
          </div>
          <div>
            <small>From</small>
            <strong>
              BHD {(offer.price / offer.maxGroup).toFixed(2)} <em>/ person</em>
            </strong>
          </div>
        </div>
        <div className="market-card-footer">
          <span>
            <UsersIcon /> {offer.minGroup}–{offer.maxGroup} people
          </span>
          <button onClick={() => onView(offer)}>
            View Details <Arrow />
          </button>
        </div>
      </div>
    </article>
  );
}

function BrowsePage({
  onNavigate,
  onSelect,
}: {
  onNavigate: (page: Page) => void;
  onSelect: (offer: MarketplaceOffer) => void;
}) {
  const [search, setSearch] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [surprise, setSurprise] = useState<MarketplaceOffer | null>(null);

  const filteredOffers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const numericGroup = Number(groupSize);
    const numericBudget = Number(budget);
    return marketplaceOffers.filter((offer) => {
      const matchesSearch =
        !normalizedSearch ||
        `${offer.business} ${offer.title} ${offer.location} ${offer.category}`
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesGroup =
        !numericGroup || (numericGroup >= offer.minGroup && numericGroup <= offer.maxGroup);
      const matchesBudget = !numericBudget || offer.price <= numericBudget;
      const matchesCategory = !category || offer.category === category;
      const matchesLocation = !location || offer.location === location;
      return matchesSearch && matchesGroup && matchesBudget && matchesCategory && matchesLocation;
    });
  }, [search, groupSize, budget, category, location]);

  const clearFilters = () => {
    setSearch("");
    setGroupSize("");
    setBudget("");
    setCategory("");
    setLocation("");
    setSurprise(null);
  };

  const pickSurprise = () => {
    if (!filteredOffers.length) return;
    setSurprise(filteredOffers[Math.floor(Math.random() * filteredOffers.length)]);
  };

  const viewOffer = (offer: MarketplaceOffer) => {
    onSelect(offer);
    onNavigate("details");
  };

  return (
    <>
      <CustomerHeader page="browse" onNavigate={onNavigate} />
      <main className="browse-page">
        <section className="browse-hero">
          <div className="section-shell">
            <div className="eyebrow">
              <span /> Made for the whole crew
            </div>
            <div className="browse-title-row">
              <div>
                <h1>
                  Find your group’s
                  <br />
                  <em>next favourite plan.</em>
                </h1>
                <p>Explore original experiences and exclusive group prices across Bahrain.</p>
              </div>
              <div className="browse-count">
                <strong>{marketplaceOffers.length}</strong>
                <span>
                  handpicked
                  <br />
                  group offers
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="filter-section section-shell">
          <div className="market-search">
            <SearchIcon />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search activities, businesses, or places"
            />
            {search && (
              <button aria-label="Clear search" onClick={() => setSearch("")}>
                ×
              </button>
            )}
          </div>
          <div className="filter-grid">
            <label>
              <span>Group size</span>
              <div className="filter-control">
                <UsersIcon />
                <select value={groupSize} onChange={(event) => setGroupSize(event.target.value)}>
                  <option value="">Any size</option>
                  {[3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                    <option key={size} value={size}>
                      {size} people
                    </option>
                  ))}
                </select>
                <SelectChevron />
              </div>
            </label>
            <label>
              <span>Total budget</span>
              <div className="filter-control budget-control">
                <b>BHD</b>
                <input
                  min="1"
                  type="number"
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  placeholder="Any budget"
                />
              </div>
            </label>
            <label>
              <span>Category</span>
              <div className="filter-control">
                <select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="">All categories</option>
                  <option>Dining</option>
                  <option>Cinema</option>
                  <option>Recreation</option>
                </select>
                <SelectChevron />
              </div>
            </label>
            <label>
              <span>Location</span>
              <div className="filter-control">
                <select value={location} onChange={(event) => setLocation(event.target.value)}>
                  <option value="">All Bahrain</option>
                  {["Manama", "Seef", "Juffair", "Amwaj", "Riffa", "Muharraq", "Isa Town"].map(
                    (place) => (
                      <option key={place}>{place}</option>
                    ),
                  )}
                </select>
                <SelectChevron />
              </div>
            </label>
          </div>
          <div className="filter-actions">
            <button className="clear-filters" onClick={clearFilters}>
              Clear Filters
            </button>
            <button
              className="surprise-button"
              onClick={pickSurprise}
              disabled={!filteredOffers.length}
            >
              <Icon>
                <path
                  d="M12 3l1.1 3.9L17 8l-3.9 1.1L12 13l-1.1-3.9L7 8l3.9-1.1L12 3ZM18.5 13l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"
                  fill="currentColor"
                />
              </Icon>
              Surprise Me
            </button>
          </div>
        </section>

        <section className="market-results section-shell">
          <div className="results-heading">
            <div>
              <h2>Group activities</h2>
              <span>
                {filteredOffers.length} {filteredOffers.length === 1 ? "offer" : "offers"} found
              </span>
            </div>
            {(search || groupSize || budget || category || location) && (
              <p>Filtered for your group</p>
            )}
          </div>
          {filteredOffers.length ? (
            <div className="market-grid">
              {filteredOffers.map((offer) => (
                <MarketplaceCard key={offer.id} offer={offer} onView={viewOffer} />
              ))}
            </div>
          ) : (
            <div className="market-empty">
              <div className="empty-illustration">
                <SearchIcon />
              </div>
              <h3>Nothing fits those plans just yet.</h3>
              <p>
                Try widening your budget, group size, or location. There’s a great day out waiting.
              </p>
              <button className="primary-button" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>
      {surprise && (
        <div
          className="surprise-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Surprise activity suggestion"
          onClick={() => setSurprise(null)}
        >
          <div className="surprise-modal" onClick={(event) => event.stopPropagation()}>
            <button className="surprise-close" onClick={() => setSurprise(null)} aria-label="Close">
              ×
            </button>
            <div className="surprise-image">
              <img src={surprise.image} alt={surprise.title} />
              <span>Our pick for your group</span>
            </div>
            <div className="surprise-content">
              <div className="eyebrow">
                <span /> A little spontaneity
              </div>
              <p>{surprise.business}</p>
              <h2>{surprise.title}</h2>
              <div>
                <span>{surprise.location}</span>
                <span>BHD {surprise.price} total</span>
                <span>
                  {surprise.minGroup}–{surprise.maxGroup} people
                </span>
              </div>
              <button className="primary-button" onClick={() => viewOffer(surprise)}>
                See this deal <Arrow />
              </button>
              <button className="try-again" onClick={pickSurprise}>
                Pick another
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function OfferDetailsPage({
  offer,
  onNavigate,
}: {
  offer: MarketplaceOffer;
  onNavigate: (page: Page) => void;
}) {
  const perPersonLow = (offer.price / offer.maxGroup).toFixed(2);
  const perPersonHigh = (offer.price / offer.minGroup).toFixed(2);
  return (
    <>
      <CustomerHeader page="details" onNavigate={onNavigate} />
      <main className="details-page section-shell">
        <button className="back-link" onClick={() => onNavigate("browse")}>
          <Icon>
            <path
              d="M19 12H5M11 18l-6-6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </Icon>
          Back to Browse
        </button>
        <div className="details-layout">
          <section className="details-image">
            <img src={offer.image} alt={offer.title} />
            <div className="details-image-label">
              <span>{offer.category}</span>
              <strong>{offer.location}, Bahrain</strong>
            </div>
          </section>
          <section className="details-content">
            <div className="eyebrow">
              <span /> Group offer
            </div>
            <p className="details-business">{offer.business}</p>
            <h1>{offer.title}</h1>
            <div className="details-location">
              <Icon size={17}>
                <path
                  d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.7" />
              </Icon>
              {offer.location}, Bahrain
            </div>
            <p className="details-description">{offer.description}</p>
            <div className="details-metrics">
              <div>
                <small>Total group price</small>
                <strong>BHD {offer.price}</strong>
                <span>for the whole group</span>
              </div>
              <div>
                <small>Estimated per person</small>
                <strong>
                  BHD {perPersonLow}–{perPersonHigh}
                </strong>
                <span>based on group size</span>
              </div>
              <div>
                <small>Group eligibility</small>
                <strong>
                  {offer.minGroup}–{offer.maxGroup}
                </strong>
                <span>participants</span>
              </div>
            </div>
            <div className="terms-box">
              <h3>Good to know</h3>
              <ul>
                {offer.terms.map((term) => (
                  <li key={term}>
                    <span>✓</span>
                    {term}
                  </li>
                ))}
              </ul>
            </div>
            <button className="claim-button" onClick={() => onNavigate("claim")}>
              Claim This Deal <Arrow />
            </button>
            <p className="claim-note">
              No payment required. The business will review your claim first.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

function ClaimDealPage({
  offer,
  onNavigate,
  onCreateClaim,
}: {
  offer: MarketplaceOffer;
  onNavigate: (page: Page) => void;
  onCreateClaim: (claim: CustomerClaim) => void;
}) {
  const [participants, setParticipants] = useState(offer.minGroup);
  const [submitted, setSubmitted] = useState(false);
  const [createdClaim, setCreatedClaim] = useState<CustomerClaim | null>(null);
  const valid = participants >= offer.minGroup && participants <= offer.maxGroup;
  const perPerson = valid ? (offer.price / participants).toFixed(2) : "—";

  const submitClaim = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (!valid) return;
    const claim: CustomerClaim = {
      reference: `GBH-${Date.now().toString(36).slice(-6).toUpperCase()}`,
      offerId: offer.id,
      activity: offer.title,
      business: offer.business,
      participants,
      date: new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
      status: "Pending",
    };
    onCreateClaim(claim);
    setCreatedClaim(claim);
  };

  return (
    <>
      <CustomerHeader page="claim" onNavigate={onNavigate} />
      <main className="claim-page section-shell">
        {createdClaim ? (
          <section className="claim-success">
            <div className="success-rings">
              <span>✓</span>
            </div>
            <div className="eyebrow">
              <span /> Claim sent successfully
            </div>
            <h1>
              Your plan is officially
              <br />
              in motion.
            </h1>
            <p>
              {offer.business} will review your request. We’ve added it to My Claims so you can keep
              an eye on the status.
            </p>
            <div className="reference-card">
              <div>
                <small>Claim reference</small>
                <strong>{createdClaim.reference}</strong>
              </div>
              <span className="status-pill pending">
                <i /> Pending
              </span>
            </div>
            <button className="primary-button" onClick={() => onNavigate("claims")}>
              View My Claims <Arrow />
            </button>
            <button className="success-browse" onClick={() => onNavigate("browse")}>
              Keep exploring
            </button>
          </section>
        ) : (
          <>
            <button className="back-link" onClick={() => onNavigate("details")}>
              <Icon>
                <path
                  d="M19 12H5M11 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </Icon>
              Back to offer
            </button>
            <div className="claim-layout">
              <section className="claim-form-card">
                <div className="eyebrow">
                  <span /> One last step
                </div>
                <h1>Claim your group deal.</h1>
                <p>
                  Tell us how many people are joining. The business will confirm availability after
                  you submit.
                </p>
                <form onSubmit={submitClaim}>
                  <label>
                    <span>Number of participants</span>
                    <small>
                      This offer welcomes {offer.minGroup} to {offer.maxGroup} people.
                    </small>
                    <div className={`participant-counter ${submitted && !valid ? "error" : ""}`}>
                      <button
                        type="button"
                        aria-label="Decrease participants"
                        onClick={() => setParticipants(Math.max(1, participants - 1))}
                      >
                        −
                      </button>
                      <input
                        aria-label="Number of participants"
                        type="number"
                        value={participants}
                        onChange={(event) => setParticipants(Number(event.target.value))}
                      />
                      <button
                        type="button"
                        aria-label="Increase participants"
                        onClick={() => setParticipants(participants + 1)}
                      >
                        +
                      </button>
                    </div>
                    {submitted && !valid && (
                      <em className="participant-error">
                        Choose between {offer.minGroup} and {offer.maxGroup} participants.
                      </em>
                    )}
                  </label>
                  <div className="claim-total">
                    <div>
                      <span>Group total</span>
                      <strong>BHD {offer.price}</strong>
                    </div>
                    <div>
                      <span>Estimated per person</span>
                      <strong>{valid ? `BHD ${perPerson}` : "Adjust group size"}</strong>
                    </div>
                  </div>
                  <button className="claim-button" type="submit">
                    Submit Claim <Arrow />
                  </button>
                  <p className="claim-note">
                    By submitting, you agree to the offer terms. No payment is taken now.
                  </p>
                </form>
              </section>
              <aside className="claim-summary">
                <img src={offer.image} alt={offer.title} />
                <div>
                  <span>
                    {offer.category} · {offer.location}
                  </span>
                  <p>{offer.business}</p>
                  <h2>{offer.title}</h2>
                  <ul>
                    <li>
                      <UsersIcon />
                      <span>
                        <small>Group size</small>
                        {offer.minGroup}–{offer.maxGroup} participants
                      </span>
                    </li>
                    <li>
                      <Icon size={18}>
                        <path
                          d="M4 7h16v13H4zM7 4v6M17 4v6M4 11h16"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="1.6"
                        />
                      </Icon>
                      <span>
                        <small>Claim status</small>Sent as pending
                      </span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>
    </>
  );
}

function MyClaimsPage({
  claims,
  onNavigate,
  onSelectOffer,
}: {
  claims: CustomerClaim[];
  onNavigate: (page: Page) => void;
  onSelectOffer: (offer: MarketplaceOffer) => void;
}) {
  const [status, setStatus] = useState<ClaimStatus | "All">("All");
  const visibleClaims =
    status === "All" ? claims : claims.filter((claim) => claim.status === status);
  const counts = {
    Pending: claims.filter((claim) => claim.status === "Pending").length,
    Approved: claims.filter((claim) => claim.status === "Approved").length,
    Rejected: claims.filter((claim) => claim.status === "Rejected").length,
  };
  const openOffer = (offerId: string) => {
    const offer = marketplaceOffers.find((item) => item.id === offerId);
    if (offer) {
      onSelectOffer(offer);
      onNavigate("details");
    }
  };
  return (
    <>
      <CustomerHeader page="claims" onNavigate={onNavigate} />
      <main className="claims-page">
        <section className="claims-hero">
          <div className="section-shell">
            <div>
              <div className="eyebrow light">
                <span /> Customer dashboard
              </div>
              <h1>My claims</h1>
              <p>Track every plan, from first request to final confirmation.</p>
            </div>
            <div className="claims-stats">
              {(["Pending", "Approved", "Rejected"] as ClaimStatus[]).map((item) => (
                <div key={item}>
                  <strong>{counts[item]}</strong>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="claims-content section-shell">
          <div className="claims-toolbar">
            <div>
              {(["All", "Pending", "Approved", "Rejected"] as const).map((item) => (
                <button
                  className={status === item ? "active" : ""}
                  key={item}
                  onClick={() => setStatus(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="new-claim-button" onClick={() => onNavigate("browse")}>
              Find another activity <Arrow />
            </button>
          </div>
          {visibleClaims.length ? (
            <div className="claims-list">
              {visibleClaims.map((claim) => (
                <article className="claim-row" key={claim.reference}>
                  <div className="claim-reference">
                    <small>Claim reference</small>
                    <strong>{claim.reference}</strong>
                  </div>
                  <div className="claim-activity">
                    <small>{claim.business}</small>
                    <strong>{claim.activity}</strong>
                  </div>
                  <div>
                    <small>Participants</small>
                    <strong>{claim.participants} people</strong>
                  </div>
                  <div>
                    <small>Submitted</small>
                    <strong>{claim.date}</strong>
                  </div>
                  <span className={`status-pill ${claim.status.toLowerCase()}`}>
                    <i /> {claim.status}
                  </span>
                  <button
                    className="claim-row-arrow"
                    onClick={() => openOffer(claim.offerId)}
                    aria-label={`View ${claim.activity}`}
                  >
                    <Arrow />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="claims-empty">
              <h3>No {status.toLowerCase()} claims</h3>
              <p>Your claims with this status will appear here.</p>
            </div>
          )}
          <div className="claims-help">
            <div>
              <strong>Need a hand with a claim?</strong>
              <span>Our support team is here to help with changes or questions.</span>
            </div>
            <button>Contact support</button>
          </div>
        </section>
      </main>
    </>
  );
}

function AuthPage({ onBack, onBusinessDemo }: { onBack: () => void; onBusinessDemo: () => void }) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [accountType, setAccountType] = useState<AccountType>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);
  const [created, setCreated] = useState(false);

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode);
    setSubmitted(false);
    setCredentialsError(false);
    setCreated(false);
  };

  const errors = {
    email:
      submitted &&
      (!email ? "Email is required" : !email.includes("@") ? "Enter a valid email address" : ""),
    password:
      submitted &&
      (!password ? "Password is required" : password.length < 6 ? "Use at least 6 characters" : ""),
    confirm:
      submitted &&
      mode === "register" &&
      (!confirmPassword
        ? "Please confirm your password"
        : confirmPassword !== password
          ? "Passwords do not match"
          : ""),
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setCredentialsError(false);
    setCreated(false);
    const validEmail = email.includes("@");
    const validPassword = password.length >= 6;
    const validConfirm =
      mode === "login" || (confirmPassword.length > 0 && password === confirmPassword);
    if (!validEmail || !validPassword || !validConfirm) return;
    if (mode === "login") setCredentialsError(true);
    else setCreated(true);
  };

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <div className="auth-visual-top">
          <Logo light />
          <button onClick={onBack}>
            <Icon>
              <path
                d="M19 12H5M11 18l-6-6 6-6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </Icon>{" "}
            Back to home
          </button>
        </div>
        <div className="auth-visual-content">
          <div className="eyebrow light">
            <span /> Plans are better shared
          </div>
          <h1>
            Your next favourite
            <br />
            memory starts here.
          </h1>
          <p>Join thousands of people discovering more to do, together, across Bahrain.</p>
          <div className="auth-quote">
            <p>“We found our new favourite weekend spot in less than five minutes.”</p>
            <span>Layla & friends, Manama</span>
          </div>
        </div>
        <div className="auth-photo-strip">
          <img alt="Dinner prepared for a group" src={photos.food} />
          <img alt="Friends at the cinema" src={photos.cinema} />
          <img alt="Bowling activity" src={photos.recreation} />
        </div>
      </section>

      <section className="auth-form-side">
        <button className="mobile-back" onClick={onBack}>
          <Icon>
            <path
              d="M19 12H5M11 18l-6-6 6-6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </Icon>{" "}
          Back
        </button>
        <div className="auth-form-shell">
          <div className="auth-heading">
            <span>{mode === "login" ? "Welcome back" : "Join Gather BH"}</span>
            <h2>{mode === "login" ? "Good to see you again." : "Create your account."}</h2>
            <p>
              {mode === "login"
                ? "Log in to claim offers and keep your plans in one place."
                : "Start finding better plans for your group today."}
            </p>
          </div>

          <div className="auth-tabs">
            <button
              className={mode === "login" ? "active" : ""}
              onClick={() => changeMode("login")}
            >
              Log In
            </button>
            <button
              className={mode === "register" ? "active" : ""}
              onClick={() => changeMode("register")}
            >
              Create Account
            </button>
          </div>

          {mode === "register" && (
            <div className="account-picker">
              <label>I’m joining as</label>
              <div>
                <button
                  className={accountType === "customer" ? "active" : ""}
                  onClick={() => setAccountType("customer")}
                >
                  <span>
                    <UsersIcon />
                  </span>
                  <strong>Customer</strong>
                  <small>Find and claim deals</small>
                </button>
                <button
                  className={accountType === "business" ? "active" : ""}
                  onClick={() => setAccountType("business")}
                >
                  <span>
                    <Icon size={18}>
                      <path
                        d="M4 20V8h16v12M2 8l2-5h16l2 5M8 20v-6h8v6M3 8a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                      />
                    </Icon>
                  </span>
                  <strong>Business</strong>
                  <small>Manage offers & claims</small>
                </button>
              </div>
            </div>
          )}

          <form noValidate onSubmit={submit}>
            <label className="field">
              <span>Email address</span>
              <div className={errors.email ? "input-wrap error" : "input-wrap"}>
                <Icon>
                  <path
                    d="M4 5h16v14H4zM4 7l8 6 8-6"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </Icon>
                <input
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  value={email}
                />
              </div>
              {errors.email && <small className="error-text">{errors.email}</small>}
            </label>
            <label className="field">
              <span>Password</span>
              <div className={errors.password ? "input-wrap error" : "input-wrap"}>
                <Icon>
                  <path
                    d="M6 10h12v10H6zM8.5 10V7.5a3.5 3.5 0 0 1 7 0V10M12 14v2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                  />
                </Icon>
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  type={showPassword ? "text" : "password"}
                  value={password}
                />
                <button
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon>
                    <path
                      d="M2.5 12s3.5-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
                  </Icon>
                </button>
              </div>
              {errors.password && <small className="error-text">{errors.password}</small>}
            </label>
            {mode === "register" && (
              <label className="field">
                <span>Confirm password</span>
                <div className={errors.confirm ? "input-wrap error" : "input-wrap"}>
                  <Icon>
                    <path
                      d="M6 10h12v10H6zM8.5 10V7.5a3.5 3.5 0 0 1 7 0V10M12 14v2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                    />
                  </Icon>
                  <input
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repeat your password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                  />
                </div>
                {errors.confirm && <small className="error-text">{errors.confirm}</small>}
              </label>
            )}
            {mode === "login" && (
              <div className="forgot-row">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button">Forgot password?</button>
              </div>
            )}
            {credentialsError && (
              <div className="form-alert">
                <strong>Those details don’t look right.</strong>
                <span>This is a prototype, so authentication isn’t connected yet.</span>
              </div>
            )}
            {created && (
              <div className="form-success">
                <strong>Your prototype account is ready.</strong>
                <span>No data was saved. You can now explore the experience.</span>
              </div>
            )}
            <button className="auth-submit" type="submit">
              {mode === "login"
                ? "Log In"
                : `Create ${accountType === "business" ? "Business " : ""}Account`}{" "}
              <Arrow />
            </button>
          </form>
          <p className="auth-switch">
            {mode === "login" ? "New to Gather BH?" : "Already have an account?"}{" "}
            <button onClick={() => changeMode(mode === "login" ? "register" : "login")}>
              {mode === "login" ? "Create an account" : "Log in"}
            </button>
          </p>
          <p className="auth-switch">
            <button type="button" onClick={onBusinessDemo}>Preview the Business Dashboard</button>
          </p>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedOffer, setSelectedOffer] = useState<MarketplaceOffer>(marketplaceOffers[0]);
  const [claims, setClaims] = useState<CustomerClaim[]>(() => {
    try {
      const saved = localStorage.getItem("gather-bh-claims");
      return saved ? JSON.parse(saved) : initialDemoClaims;
    } catch {
      return initialDemoClaims;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("gather-bh-claims", JSON.stringify(claims));
    } catch {
      // Keep the prototype usable when browser storage is unavailable.
    }
  }, [claims]);

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const addClaim = (claim: CustomerClaim) => {
    setClaims((current) => [claim, ...current]);
  };

  if (page === "home") return <HomePage onNavigate={navigate} />;
  if (page === "auth") return <AuthPage onBack={() => navigate("home")} onBusinessDemo={() => navigate("business")} />;
  if (page === "business") return <BusinessPortal onHome={() => navigate("home")} />;
  if (page === "browse") return <BrowsePage onNavigate={navigate} onSelect={setSelectedOffer} />;
  if (page === "details") return <OfferDetailsPage offer={selectedOffer} onNavigate={navigate} />;
  if (page === "claim")
    return <ClaimDealPage offer={selectedOffer} onNavigate={navigate} onCreateClaim={addClaim} />;
  return <MyClaimsPage claims={claims} onNavigate={navigate} onSelectOffer={setSelectedOffer} />;
}

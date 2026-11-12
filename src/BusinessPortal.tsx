import { FormEvent, useState } from "react";
import "./business.css";

type BusinessPage = "dashboard" | "offers" | "claims" | "profile";

type Offer = {
  title: string;
  category: string;
  groupSize: string;
  price: string;
  status: "Active" | "Inactive";
};

type Claim = {
  reference: string;
  customer: string;
  offer: string;
  groupSize: number;
  status: "Pending" | "Approved" | "Rejected";
};

const demoOffers: Offer[] = [
  { title: "Weekend Group Brunch", category: "Dining", groupSize: "4–8", price: "BHD 48", status: "Active" },
  { title: "Family Movie Bundle", category: "Cinema", groupSize: "4–6", price: "BHD 24", status: "Active" },
  { title: "Bowling Night Package", category: "Recreation", groupSize: "4–10", price: "BHD 35", status: "Inactive" },
];

const demoClaims: Claim[] = [
  { reference: "GBH-1042", customer: "Customer A", offer: "Weekend Group Brunch", groupSize: 5, status: "Pending" },
  { reference: "GBH-1039", customer: "Customer B", offer: "Family Movie Bundle", groupSize: 4, status: "Approved" },
  { reference: "GBH-1034", customer: "Customer C", offer: "Weekend Group Brunch", groupSize: 6, status: "Rejected" },
];

export default function BusinessPortal({ onHome }: { onHome: () => void }) {
  const [page, setPage] = useState<BusinessPage>("dashboard");
  const [offers, setOffers] = useState(demoOffers);
  const [claims, setClaims] = useState(demoClaims);
  const [notice, setNotice] = useState("");
  const [profile, setProfile] = useState({ name: "GatherBH Demo Partner", email: "demo@example.com", location: "Manama, Bahrain" });

  function changePage(nextPage: BusinessPage) {
    setPage(nextPage);
    setNotice("");
  }

  function addOffer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const title = String(data.get("title") || "").trim();
    const price = Number(data.get("price"));
    const groupSize = Number(data.get("groupSize"));
    if (!title || !Number.isFinite(price) || price <= 0 || groupSize < 2) {
      setNotice("Please enter an offer title, a positive price, and at least 2 participants.");
      return;
    }
    setOffers((previous) => [{ title, category: String(data.get("category")), groupSize: String(groupSize), price: `BHD ${price.toFixed(2)}`, status: "Active" }, ...previous]);
    setNotice("Sample offer added to this preview.");
    form.reset();
  }

  function updateClaim(reference: string, status: Claim["status"]) {
    setClaims((previous) => previous.map((claim) => claim.reference === reference ? { ...claim, status } : claim));
    setNotice(`Sample claim ${reference} marked ${status.toLowerCase()}.`);
  }

  function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setProfile({ name: String(data.get("name")), email: String(data.get("email")), location: String(data.get("location")) });
    setNotice("Profile preview updated.");
  }

  return (
    <div className="business-app">
      <header className="business-header">
        <div>
          <span className="business-brand">GatherBH</span>
          <span className="business-subtitle">Business Portal · Front-end Preview</span>
        </div>
        <button className="business-home" type="button" onClick={onHome}>← Back to Home</button>
      </header>
      <div className="business-layout">
        <nav className="business-nav" aria-label="Business dashboard navigation">
          {(["dashboard", "offers", "claims", "profile"] as BusinessPage[]).map((item) => (
            <button key={item} type="button" className={page === item ? "selected" : ""} onClick={() => changePage(item)} aria-current={page === item ? "page" : undefined}>
              {item === "dashboard" ? "Dashboard" : item === "offers" ? "Manage Offers" : item === "claims" ? "Customer Claims" : "Business Profile"}
            </button>
          ))}
        </nav>
        <main className="business-main">
          {page === "dashboard" && <>
            <p className="business-eyebrow">Business Account</p>
            <h1>Welcome back!</h1>
            <p className="business-muted">An overview of your group deals and customer claims.</p>
            <div className="business-metrics">
              <div><strong>{offers.length}</strong><span>Total Offers</span></div>
              <div><strong>{offers.filter((offer) => offer.status === "Active").length}</strong><span>Active Offers</span></div>
              <div><strong>{claims.filter((claim) => claim.status === "Pending").length}</strong><span>Pending Claims</span></div>
            </div>
            <div className="business-actions">
              <button type="button" onClick={() => changePage("offers")}>Manage Offers</button>
              <button type="button" onClick={() => changePage("claims")}>Review Customer Claims</button>
            </div>
          </>}
          {page === "offers" && <>
            <p className="business-eyebrow">Business Account</p>
            <h1>Manage Offers</h1>
            <p className="business-muted">Sample published offers for the front-end preview.</p>
            <div className="business-panel">
              <h2>Your Offers</h2>
              <div className="business-table-wrap"><table><thead><tr><th>Offer</th><th>Category</th><th>Group Size</th><th>Price</th><th>Status</th><th>Action</th></tr></thead><tbody>
                {offers.map((offer, index) => <tr key={`${offer.title}-${index}`}><td>{offer.title}</td><td>{offer.category}</td><td>{offer.groupSize}</td><td>{offer.price}</td><td><span className={`business-status ${offer.status.toLowerCase()}`}>{offer.status}</span></td><td><button className="business-small" type="button" onClick={() => setOffers((all) => all.map((entry, i) => i === index ? { ...entry, status: entry.status === "Active" ? "Inactive" : "Active" } : entry))}>{offer.status === "Active" ? "Deactivate" : "Activate"}</button></td></tr>)}
              </tbody></table></div>
            </div>
            <div className="business-panel">
              <h2>Add Sample Offer</h2>
              <form className="business-form" onSubmit={addOffer}>
                <label>Offer title<input required name="title" placeholder="Group activity package" /></label>
                <label>Category<select name="category"><option>Dining</option><option>Cinema</option><option>Recreation</option></select></label>
                <label>Price (BHD)<input required name="price" type="number" min="0.01" step="0.01" placeholder="25" /></label>
                <label>Minimum group size<input required name="groupSize" type="number" min="2" defaultValue={4} /></label>
                <button type="submit">Add Sample Offer</button>
              </form>
            </div>
          </>}
          {page === "claims" && <>
            <p className="business-eyebrow">Business Account</p>
            <h1>Customer Claims</h1>
            <p className="business-muted">Review example customer requests.</p>
            <div className="business-panel"><div className="business-table-wrap"><table><thead><tr><th>Reference</th><th>Customer</th><th>Offer</th><th>People</th><th>Status</th><th>Actions</th></tr></thead><tbody>
              {claims.map((claim) => <tr key={claim.reference}><td>{claim.reference}</td><td>{claim.customer}</td><td>{claim.offer}</td><td>{claim.groupSize}</td><td><span className={`business-status ${claim.status.toLowerCase()}`}>{claim.status}</span></td><td><div className="business-inline-actions"><button type="button" className="business-small" onClick={() => updateClaim(claim.reference, "Approved")}>Approve</button><button type="button" className="business-small" onClick={() => updateClaim(claim.reference, "Rejected")}>Reject</button></div></td></tr>)}
            </tbody></table></div></div>
          </>}
          {page === "profile" && <>
            <p className="business-eyebrow">Business Account</p>
            <h1>Business Profile</h1>
            <p className="business-muted">Sample business information and editable fields.</p>
            <div className="business-panel"><form className="business-form" onSubmit={updateProfile} key={`${profile.name}-${profile.email}-${profile.location}`}>
              <label>Business name<input required name="name" defaultValue={profile.name} /></label>
              <label>Contact email<input required name="email" type="email" defaultValue={profile.email} /></label>
              <label>Location<input required name="location" defaultValue={profile.location} /></label>
              <button type="submit">Save Preview Changes</button>
            </form></div>
          </>}
          <p role="status" aria-live="polite" className="business-notice">{notice}</p>
          <p className="business-disclaimer">Demo content only. Changes are temporary and are not connected to a database.</p>
        </main>
      </div>
    </div>
  );
}

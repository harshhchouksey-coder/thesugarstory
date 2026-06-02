import React, { useState, useEffect } from "react";
import { 
  Cake, 
  Clock, 
  Map, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  UserCheck, 
  TrendingUp, 
  Sparkles 
} from "lucide-react";

export default function KitchenAdminDashboardWidget() {
  // 1. Kitchen Board State
  const [prepOrders, setPrepOrders] = useState([
    { id: "ord_101", slot: "9–12", customer: "Aditi Rao", item: "Taj Signature Chocolate Mousse Cake", isEggless: true, status: "Prepping", note: "Write 'Happy 30th' in gold glaze" },
    { id: "ord_102", slot: "12–3", customer: "Vikram Sengupta", item: "Assorted Brownies Box", isEggless: false, status: "Queued", note: "refrigerate packing" },
    { id: "ord_103", slot: "3–6", customer: "Meera Nair", item: "Vanilla Bean Wedding Cake", isEggless: false, status: "Baking", note: "Needs 48h curing" },
    { id: "ord_104", slot: "6–9", customer: "Rohan Kolar", item: "New York Salted Caramel Cheesecake", isEggless: true, status: "Ready", note: "cold chain flag" },
    { id: "ord_105", slot: "11:30 PM", customer: "Amit Sharma", item: "Taj Signature Chocolate Mousse Cake", isEggless: true, status: "Queued", note: "Midnight Surprise" }
  ]);

  // 2. Customisation Moderation Queue State
  const [moderations, setModerations] = useState([
    { id: "mod_1", orderId: "ord_201", item: "Taj Signature Mousse", message: "Love you till the end of chapters!", photoUrl: "/uploads/m2.jpg", status: "pending" },
    { id: "mod_2", orderId: "ord_202", item: "Wedding Special", message: "Conquering decades together", photoUrl: "/uploads/w3.jpg", status: "pending" }
  ]);

  // 3. Slot capacity registry simulator
  const [zones, setZones] = useState([
    { name: "Z1 Central", pin: "462016", fee: "Free", booked: 21, capacity: 25 },
    { name: "Z2 New Bhopal/Kolar", pin: "462039", fee: "₹49", booked: 4, capacity: 25 },
    { name: "Z3 North/Bairagarh", pin: "462030", fee: "₹59", booked: 2, capacity: 25 },
    { name: "Z4 East/Govindpura", pin: "462022", fee: "₹59", booked: 19, capacity: 25 },
    { name: "Z5 Outer/Misrod", pin: "462044", fee: "₹99", booked: 0, capacity: 25 }
  ]);

  // Handle Prep status toggle
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setPrepOrders(orders => 
      orders.map(o => o.id === id ? { ...o, status: newStatus } : o)
    );
  };

  // Moderate Message
  const handleModerate = (id: string, decision: "approved" | "rejected") => {
    setModerations(mods => 
      mods.map(m => m.id === id ? { ...m, status: decision } : m)
    );
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "#1F1410", backgroundColor: "#F6EFE3", padding: "24px", minHeight: "100vh" }}>
      
      {/* Brand Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #A8A095", paddingBottom: "16px", marginBottom: "24px" }}>
        <div>
          <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9962B", fontWeight: "bold" }}>Ex-Taj Culinary Console</span>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "32px", margin: "4px 0 0 0", fontWeight: "normal" }}>Chef Shalini's Kitchen Workspace</h1>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <span style={{ backgroundColor: "#1F1410", color: "#F6EFE3", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", padding: "6px 12px", borderRadius: "0px" }}>Salon Active</span>
        </div>
      </div>

      {/* KPI dashboard grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Bhopal Slot Fill Ratio", val: "84.2%", desc: "Z1 & Z4 near peak limits" },
          { label: "Loyalty Tier Enrolments", val: "+148 Patrons", desc: "Storytellers at 42%" },
          { label: "WA Sequence Recovery", val: "₹84,500", desc: "Abandoned Suppression: 24%" },
          { label: "Custom Queue Moderation", val: "2 Pending", desc: "Awaiting Chef confirmation" }
        ].map((kpi, i) => (
          <div key={i} style={{ border: "1px solid #A8A095", padding: "16px", backgroundColor: "#F6EFE3" }}>
            <span style={{ fontSize: "10px", color: "#A8A095", textTransform: "uppercase", letterSpacing: "0.1em" }}>{kpi.label}</span>
            <h4 style={{ fontSize: "24px", margin: "6px 0 2px 0", color: "#6B3F2A", fontWeight: "bold" }}>{kpi.val}</h4>
            <span style={{ fontSize: "9px", color: "#5C7F5A" }}>{kpi.desc}</span>
          </div>
        ))}
      </div>

      {/* Main Admin Section grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr lg:350px", gap: "24px", alignItems: "start" }}>
        
        {/* Left Side: Kitchen Slots Board */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <div style={{ border: "1px solid #A8A095", padding: "20px", backgroundColor: "#F6EFE3" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={18} style={{ color: "#C9962B" }} />
              <span>Today's Slot Baking Board</span>
            </h2>

            {/* Time Slot Lanes */}
            <div style={{ display: "flex", flexFlow: "column", gap: "12px" }}>
              {["9–12", "12–3", "3–6", "6–9", "11:30 PM"].map(lane => {
                const laneOrders = prepOrders.filter(o => o.slot === lane);
                return (
                  <div key={lane} style={{ border: "1px solid rgba(168,160,149,0.3)", padding: "12px", backgroundColor: "rgba(246,239,227,0.5)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(168,160,149,0.2)", paddingBottom: "6px", marginBottom: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em" }}>Slot Range: {lane}</span>
                      <span style={{ fontSize: "10px", color: "#A8A095" }}>{laneOrders.length} orders scheduled</span>
                    </div>

                    {laneOrders.length === 0 ? (
                      <p style={{ fontSize: "10px", color: "#A8A095", margin: 0, fontStyle: "italic" }}>No orders in this slot.</p>
                    ) : (
                      <div style={{ display: "flex", flexFlow: "column", gap: "8px" }}>
                        {laneOrders.map(order => (
                          <div key={order.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", border: "1px solid #A8A095", backgroundColor: "#F6EFE3" }}>
                            <div style={{ textAlign: "left" }}>
                              <div style={{ display: "flex", gap: "6px", alignItems: "baseline" }}>
                                <strong style={{ fontSize: "12px", color: "#1F1410" }}>{order.item}</strong>
                                {order.isEggless && (
                                  <span style={{ backgroundColor: "rgba(92,127,90,0.15)", color: "#5C7F5A", fontSize: "8px", padding: "1px 4px", fontWeight: "bold", textTransform: "uppercase" }}>Eggless</span>
                                )}
                              </div>
                              <p style={{ fontSize: "10px", color: "#A8A095", margin: "4px 0" }}>Patron: {order.customer} | Ref: {order.id}</p>
                              <span style={{ fontSize: "10px", fontStyle: "italic", color: "#6B3F2A" }}>Inscription: "{order.note}"</span>
                            </div>

                            <div style={{ display: "flex", gap: "6px" }}>
                              <select 
                                value={order.status}
                                onChange={e => handleUpdateStatus(order.id, e.target.value)}
                                style={{ fontSize: "10px", textTransform: "uppercase", padding: "4px", border: "1px solid #A8A095", backgroundColor: "#F6EFE3" }}
                              >
                                <option value="Queued">Queued</option>
                                <option value="Baking">Baking</option>
                                <option value="Prepping">Prepping</option>
                                <option value="Ready">Ready</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Side Column: Moderation & Zone slots visual metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Moderation Queue widget */}
          <div style={{ border: "1px solid #A8A095", padding: "20px", backgroundColor: "#F6EFE3", textAlign: "left" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "6px" }}>
              <Cake size={18} style={{ color: "#C9962B" }} />
              <span>Chef Moderation Queue</span>
            </h2>

            <div style={{ display: "flex", flexFlow: "column", gap: "12px" }}>
              {moderations.filter(m => m.status === "pending").map(mod => (
                <div key={mod.id} style={{ border: "1px solid #A8A095", padding: "12px", backgroundColor: "#F6EFE3" }}>
                  <span style={{ fontSize: "9px", textTransform: "uppercase", color: "#A8A095" }}>Ref ID: {mod.orderId}</span>
                  <h4 style={{ fontSize: "12px", margin: "4px 0", fontWeight: "bold" }}>{mod.item}</h4>
                  
                  <div style={{ padding: "8px", borderLeft: "2px solid #C9962B", backgroundColor: "rgba(246,239,227,0.5)", margin: "8px 0", fontSize: "11px", fontStyle: "italic" }}>
                    "{mod.message}"
                  </div>

                  <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                    <button 
                      onClick={() => handleModerate(mod.id, "approved")}
                      style={{ flex: 1, backgroundColor: "#5C7F5A", color: "#F6EFE3", fontSize: "9px", border: "none", textTransform: "uppercase", padding: "6px 0", cursor: "pointer", fontWeight: "bold" }}
                    >
                      Approve Plaque
                    </button>
                    <button 
                      onClick={() => handleModerate(mod.id, "rejected")}
                      style={{ flex: 1, backgroundColor: "#A53F2B", color: "#F6EFE3", fontSize: "9px", border: "none", textTransform: "uppercase", padding: "6px 0", cursor: "pointer", fontWeight: "bold" }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}

              {moderations.filter(m => m.status === "pending").length === 0 && (
                <p style={{ fontSize: "11px", color: "#A8A095", fontStyle: "italic", margin: 0 }}>Queue is completely cleared.</p>
              )}
            </div>
          </div>

          {/* Bhopal visual zone metrics visualizer */}
          <div style={{ border: "1px solid #A8A095", padding: "20px", backgroundColor: "#F6EFE3", textAlign: "left" }}>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", margin: "0 0 16px 0", display: "flex", alignItems: "center", gap: "6px" }}>
              <Map size={18} style={{ color: "#C9962B" }} />
              <span>Bhopal Zones Capacity</span>
            </h2>

            <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
              {zones.map(zone => {
                const fillPct = Math.round((zone.booked / zone.capacity) * 100);
                const isNearFull = zone.capacity - zone.booked <= 5;
                return (
                  <div key={zone.name} style={{ fontSize: "11px", borderBottom: "1px solid rgba(168,160,149,0.2)", paddingBottom: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ color: "#1F1410" }}>{zone.name}</strong>
                      <span style={{ color: "#A8A095" }}>{zone.fee} fee</span>
                    </div>

                    {/* Progress bar visual */}
                    <div style={{ width: "100%", height: "4px", backgroundColor: "rgba(168,160,149,0.3)", margin: "6px 0" }}>
                      <div style={{ width: `${fillPct}%`, height: "100%", backgroundColor: isNearFull ? "#A53F2B" : "#5C7F5A" }} />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px" }}>
                      <span>Booked: {zone.booked}/{zone.capacity} slots</span>
                      <span style={{ color: isNearFull ? "#A53F2B" : "#5C7F5A", fontWeight: "bold" }}>
                        {isNearFull ? "PEAK WARNING" : "Feasible"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

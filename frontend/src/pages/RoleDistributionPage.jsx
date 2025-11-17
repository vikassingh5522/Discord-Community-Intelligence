import React, { useEffect, useState } from "react";
import api from "../api/axios";
import RoleDistribution from "../components/RoleDistribution";

export default function RoleDistributionPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const loadRoles = async () => {
    setLoading(true);
    try {
      const res = await api.get("/analytics/roles");
      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load role distribution");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await api.get("/users"); 
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadRoles();
    loadUsers();
  }, []);


  const handleAssignRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      await api.post(`/analytics/roles/${selectedUser.id}`, { role: newRole });
      alert(`Assigned ${newRole} to ${selectedUser.username}`);
      setSelectedUser(null);
      setNewRole("");
      loadRoles(); 
      loadUsers(); 
    } catch (err) {
      console.error(err);
      alert("Failed to assign role");
    }
  };

  return (
    <div className="min-h-[80vh] p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Role Distribution</h1>

      <div className="glass-card p-6 rounded-2xl mb-6">
        {loading ? (
          <div className="text-white/70">Loading…</div>
        ) : (
          <RoleDistribution data={data} />
        )}
      </div>

      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-3">Assign Role to User</h2>
        <div className="flex gap-3 items-center">
          <select
            className="p-2 rounded-lg text-black"
            value={selectedUser?.id || ""}
            onChange={(e) =>
              setSelectedUser(users.find(u => u.id === e.target.value))
            }
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>

          <select
            className="p-2 rounded-lg text-black"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="">Select role</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="Member">Member</option>
          </select>

          <button
            className="px-4 py-2 bg-green-500 rounded-lg font-semibold hover:bg-green-600"
            onClick={handleAssignRole}
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

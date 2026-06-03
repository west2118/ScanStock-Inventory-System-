import React from "react";

const RoleCards = ({ roles, users }: { roles: any; users: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {roles.map((role) => {
        const Icon = role.icon;
        const roleCount = users.filter((u) => u.role === role.id).length;
        return (
          <div
            key={role.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 bg-${role.color}-100 rounded-xl`}>
                <Icon className={`w-5 h-5 text-${role.color}-600`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{role.name}</h4>
                <p className="text-xs text-gray-500">{roleCount} users</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">{role.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default RoleCards;

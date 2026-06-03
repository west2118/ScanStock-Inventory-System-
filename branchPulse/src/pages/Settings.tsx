import React, { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Store,
  TrendingUp,
  Package,
  Users,
  Trophy,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Save,
  RefreshCw,
  Globe,
  Lock,
  Shield,
  Database,
  Mail,
  Smartphone,
  Building2,
  UserCog,
  Clock,
  Moon,
  Sun,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Fingerprint,
  Wifi,
  WifiOff,
  Printer,
  FileText as FileIcon,
  Calendar,
  DollarSign,
  Percent,
  TrendingUp as TrendingIcon,
  Activity,
  Heart,
  ShieldCheck,
  ShieldAlert,
  Server,
  Cloud,
  HardDrive,
  Trash2,
  Plus,
  Minus,
  ToggleLeft,
  ToggleRight,
  BellRing,
  BellOff,
  MessageSquare,
  Send,
  Archive,
  RotateCcw,
  BarChart3,
} from "lucide-react";

const SystemSettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("settings");
  const [settingsSection, setSettingsSection] = useState("company");
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Company Information
  const [companyInfo, setCompanyInfo] = useState({
    name: "BranchPulse Analytics Inc.",
    logo: "/logo.png",
    email: "info@branchpulse.com",
    phone: "+63 2 8123 4567",
    address: "123 Business Avenue, Makati City, Metro Manila, Philippines",
    website: "www.branchpulse.com",
    taxId: "123-456-789-000",
    businessPermit: "BP-2024-001",
    establishedYear: "2023",
    timezone: "Asia/Manila",
    currency: "PHP",
    dateFormat: "MM/DD/YYYY",
  });

  // System Preferences
  const [systemPrefs, setSystemPrefs] = useState({
    theme: "light",
    language: "en",
    timezone: "Asia/Manila",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
    firstDayOfWeek: "Monday",
    defaultDashboard: "overview",
    itemsPerPage: 25,
    enableAnimations: true,
    compactMode: false,
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlert: true,
    lowStockThreshold: 20,
    dailyPerformanceSummary: true,
    weeklyReport: true,
    monthlyReport: true,
    branchAchievementAlerts: true,
    employeeMilestoneAlerts: true,
    systemMaintenanceAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    notificationEmail: "alerts@branchpulse.com",
    notificationPhone: "+63 912 345 6789",
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiryDays: 90,
    minPasswordLength: 8,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    ipWhitelist: ["192.168.1.*", "10.0.0.*"],
    allowedDomains: ["branchpulse.com", "company.com"],
  });

  // Role Permissions
  const [rolePermissions, setRolePermissions] = useState({
    admin: {
      canManageUsers: true,
      canManageBranches: true,
      canManageInventory: true,
      canViewAllReports: true,
      canExportData: true,
      canManageSettings: true,
      canManageRoles: true,
      canDeleteData: true,
    },
    branch_manager: {
      canManageUsers: false,
      canManageBranches: false,
      canManageInventory: true,
      canViewAllReports: false,
      canExportData: true,
      canManageSettings: false,
      canManageRoles: false,
      canDeleteData: false,
    },
    staff: {
      canManageUsers: false,
      canManageBranches: false,
      canManageInventory: true,
      canViewAllReports: false,
      canExportData: false,
      canManageSettings: false,
      canManageRoles: false,
      canDeleteData: false,
    },
    viewer: {
      canManageUsers: false,
      canManageBranches: false,
      canManageInventory: false,
      canViewAllReports: true,
      canExportData: false,
      canManageSettings: false,
      canManageRoles: false,
      canDeleteData: false,
    },
  });

  // Backup Settings
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupTime: "02:00",
    retentionDays: 30,
    backupLocation: "cloud",
    lastBackup: "2024-01-15 02:00:00",
    backupSize: "245.6 MB",
    includeAttachments: true,
  });

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "branches", label: "Branches", icon: Store },
    { id: "sales", label: "Sales Analytics", icon: TrendingUp },
    { id: "inventory", label: "Inventory Analytics", icon: Package },
    { id: "productivity", label: "Employee Productivity", icon: Users },
    { id: "leaderboards", label: "Leaderboards", icon: Trophy },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const Sidebar = () => (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:w-72 flex-shrink-0`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BranchPulse</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const handleSaveSettings = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const settingsSections = [
    { id: "company", label: "Company Information", icon: Building2 },
    { id: "preferences", label: "System Preferences", icon: Settings },
    { id: "notifications", label: "Notification Settings", icon: Bell },
    { id: "security", label: "Security Settings", icon: Shield },
    { id: "permissions", label: "Role Permissions", icon: UserCog },
    { id: "backup", label: "Backup & Restore", icon: Database },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {sidebarOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                    System Settings
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Manage system configuration and preferences
                  </p>
                </div>
              </div>
              <button
                onClick={handleSaveSettings}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
            {saveSuccess && (
              <div className="mt-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 dark:text-green-300">
                  Settings saved successfully!
                </span>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Settings Navigation Sidebar */}
          <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 overflow-y-auto flex-shrink-0 hidden md:block">
            <div className="p-4 space-y-1">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setSettingsSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      settingsSection === section.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Company Information Section */}
            {settingsSection === "company" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={companyInfo.name}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Tax ID / Registration
                      </label>
                      <input
                        type="text"
                        value={companyInfo.taxId}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            taxId: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={companyInfo.email}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={companyInfo.phone}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Business Address
                      </label>
                      <textarea
                        value={companyInfo.address}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            address: e.target.value,
                          })
                        }
                        rows="3"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Website
                      </label>
                      <input
                        type="text"
                        value={companyInfo.website}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            website: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Established Year
                      </label>
                      <input
                        type="text"
                        value={companyInfo.establishedYear}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            establishedYear: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Default Timezone
                      </label>
                      <select
                        value={companyInfo.timezone}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            timezone: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        <option>Asia/Manila</option>
                        <option>Asia/Singapore</option>
                        <option>Asia/Tokyo</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Currency
                      </label>
                      <select
                        value={companyInfo.currency}
                        onChange={(e) =>
                          setCompanyInfo({
                            ...companyInfo,
                            currency: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        <option>PHP - Philippine Peso</option>
                        <option>USD - US Dollar</option>
                        <option>SGD - Singapore Dollar</option>
                        <option>JPY - Japanese Yen</option>
                        <option>EUR - Euro</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Company Logo Upload */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                    Company Branding
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                      <Building2 className="w-10 h-10 text-slate-400" />
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition-colors">
                        Upload Logo
                      </button>
                      <p className="text-xs text-slate-400 mt-2">
                        Recommended size: 200x200px. Max 2MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Preferences Section */}
            {settingsSection === "preferences" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    System Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Theme
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            setSystemPrefs({ ...systemPrefs, theme: "light" })
                          }
                          className={`flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                            systemPrefs.theme === "light"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          <Sun className="w-5 h-5" />
                          <span>Light</span>
                        </button>
                        <button
                          onClick={() =>
                            setSystemPrefs({ ...systemPrefs, theme: "dark" })
                          }
                          className={`flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                            systemPrefs.theme === "dark"
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          <Moon className="w-5 h-5" />
                          <span>Dark</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Language
                      </label>
                      <select
                        value={systemPrefs.language}
                        onChange={(e) =>
                          setSystemPrefs({
                            ...systemPrefs,
                            language: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        <option value="en">English</option>
                        <option value="tl">Filipino</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Date Format
                      </label>
                      <select
                        value={systemPrefs.dateFormat}
                        onChange={(e) =>
                          setSystemPrefs({
                            ...systemPrefs,
                            dateFormat: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Time Format
                      </label>
                      <select
                        value={systemPrefs.timeFormat}
                        onChange={(e) =>
                          setSystemPrefs({
                            ...systemPrefs,
                            timeFormat: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        <option>12h (1:00 PM)</option>
                        <option>24h (13:00)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        First Day of Week
                      </label>
                      <select
                        value={systemPrefs.firstDayOfWeek}
                        onChange={(e) =>
                          setSystemPrefs({
                            ...systemPrefs,
                            firstDayOfWeek: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        <option>Monday</option>
                        <option>Sunday</option>
                        <option>Saturday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Items Per Page
                      </label>
                      <select
                        value={systemPrefs.itemsPerPage}
                        onChange={(e) =>
                          setSystemPrefs({
                            ...systemPrefs,
                            itemsPerPage: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      >
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Enable Animations
                        </p>
                        <p className="text-xs text-slate-400">
                          Show smooth transitions and animations
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSystemPrefs({
                            ...systemPrefs,
                            enableAnimations: !systemPrefs.enableAnimations,
                          })
                        }
                        className="text-blue-600"
                      >
                        {systemPrefs.enableAnimations ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Compact Mode
                        </p>
                        <p className="text-xs text-slate-400">
                          Reduce spacing for more content
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSystemPrefs({
                            ...systemPrefs,
                            compactMode: !systemPrefs.compactMode,
                          })
                        }
                        className="text-blue-600"
                      >
                        {systemPrefs.compactMode ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings Section */}
            {settingsSection === "notifications" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Notification Preferences
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Low Stock Alerts
                        </p>
                        <p className="text-xs text-slate-400">
                          Notify when inventory falls below threshold
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            lowStockAlert: !notificationSettings.lowStockAlert,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.lowStockAlert ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>

                    {notificationSettings.lowStockAlert && (
                      <div className="ml-6 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Low Stock Threshold (%)
                        </label>
                        <input
                          type="number"
                          value={notificationSettings.lowStockThreshold}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              lowStockThreshold: parseInt(e.target.value),
                            })
                          }
                          className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Daily Performance Summary
                        </p>
                        <p className="text-xs text-slate-400">
                          Receive daily email with key metrics
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            dailyPerformanceSummary:
                              !notificationSettings.dailyPerformanceSummary,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.dailyPerformanceSummary ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Weekly Report
                        </p>
                        <p className="text-xs text-slate-400">
                          Send weekly performance report every Monday
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            weeklyReport: !notificationSettings.weeklyReport,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.weeklyReport ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Monthly Report
                        </p>
                        <p className="text-xs text-slate-400">
                          Send comprehensive monthly report
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            monthlyReport: !notificationSettings.monthlyReport,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.monthlyReport ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Branch Achievement Alerts
                        </p>
                        <p className="text-xs text-slate-400">
                          Notify when branches hit milestones
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            branchAchievementAlerts:
                              !notificationSettings.branchAchievementAlerts,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.branchAchievementAlerts ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delivery Channels */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                    Delivery Channels
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-700 dark:text-slate-300">
                            Email Notifications
                          </p>
                          <p className="text-xs text-slate-400">
                            Send notifications to{" "}
                            {notificationSettings.notificationEmail}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            emailNotifications:
                              !notificationSettings.emailNotifications,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.emailNotifications ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-700 dark:text-slate-300">
                            SMS Notifications
                          </p>
                          <p className="text-xs text-slate-400">
                            Send critical alerts via SMS
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            smsNotifications:
                              !notificationSettings.smsNotifications,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.smsNotifications ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-700 dark:text-slate-300">
                            In-App Notifications
                          </p>
                          <p className="text-xs text-slate-400">
                            Show notifications within the application
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setNotificationSettings({
                            ...notificationSettings,
                            inAppNotifications:
                              !notificationSettings.inAppNotifications,
                          })
                        }
                        className="text-blue-600"
                      >
                        {notificationSettings.inAppNotifications ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings Section */}
            {settingsSection === "security" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Security Configuration
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Two-Factor Authentication (2FA)
                        </p>
                        <p className="text-xs text-slate-400">
                          Require 2FA for all admin accounts
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setSecuritySettings({
                            ...securitySettings,
                            twoFactorAuth: !securitySettings.twoFactorAuth,
                          })
                        }
                        className="text-blue-600"
                      >
                        {securitySettings.twoFactorAuth ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            sessionTimeout: parseInt(e.target.value),
                          })
                        }
                        className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                      <p className="text-xs text-slate-400 mt-1">
                        Auto logout after inactivity
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Password Expiry (days)
                      </label>
                      <input
                        type="number"
                        value={securitySettings.passwordExpiryDays}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            passwordExpiryDays: parseInt(e.target.value),
                          })
                        }
                        className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Minimum Password Length
                      </label>
                      <input
                        type="number"
                        value={securitySettings.minPasswordLength}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            minPasswordLength: parseInt(e.target.value),
                          })
                        }
                        className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        Password Requirements
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={securitySettings.requireSpecialChar}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                requireSpecialChar: e.target.checked,
                              })
                            }
                            className="rounded"
                          />
                          <span className="text-sm">
                            Special character (@, #, $, etc.)
                          </span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={securitySettings.requireNumber}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                requireNumber: e.target.checked,
                              })
                            }
                            className="rounded"
                          />
                          <span className="text-sm">Number (0-9)</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={securitySettings.requireUppercase}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                requireUppercase: e.target.checked,
                              })
                            }
                            className="rounded"
                          />
                          <span className="text-sm">Uppercase letter</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            maxLoginAttempts: parseInt(e.target.value),
                          })
                        }
                        className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        IP Whitelist (one per line)
                      </label>
                      <textarea
                        value={securitySettings.ipWhitelist.join("\n")}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            ipWhitelist: e.target.value.split("\n"),
                          })
                        }
                        rows="3"
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg font-mono text-sm"
                        placeholder="192.168.1.*&#10;10.0.0.*"
                      />
                      <p className="text-xs text-slate-400 mt-1">
                        Leave empty to allow all IPs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Role Permissions Section */}
            {settingsSection === "permissions" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-blue-600" />
                    Role-Based Permissions
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 dark:bg-slate-700/50">
                        <tr>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Permission
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Admin
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Branch Manager
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Staff
                          </th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
                            Viewer
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        <tr>
                          <td className="py-3 px-4 font-medium">
                            Manage Users
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">
                            Manage Branches
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">
                            Manage Inventory
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">
                            View All Reports
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Export Data</td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">
                            Manage System Settings
                          </td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">Delete Data</td>
                          <td className="text-center py-3 px-4">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                          <td className="text-center py-3 px-4">
                            <XCircle className="w-5 h-5 text-red-400 mx-auto" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Backup & Restore Section */}
            {settingsSection === "backup" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    Backup Configuration
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-300">
                          Automatic Backups
                        </p>
                        <p className="text-xs text-slate-400">
                          Schedule regular system backups
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setBackupSettings({
                            ...backupSettings,
                            autoBackup: !backupSettings.autoBackup,
                          })
                        }
                        className="text-blue-600"
                      >
                        {backupSettings.autoBackup ? (
                          <ToggleRight className="w-8 h-8" />
                        ) : (
                          <ToggleLeft className="w-8 h-8" />
                        )}
                      </button>
                    </div>

                    {backupSettings.autoBackup && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Backup Frequency
                          </label>
                          <select
                            value={backupSettings.backupFrequency}
                            onChange={(e) =>
                              setBackupSettings({
                                ...backupSettings,
                                backupFrequency: e.target.value,
                              })
                            }
                            className="w-48 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                          >
                            <option>daily</option>
                            <option>weekly</option>
                            <option>monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Backup Time
                          </label>
                          <input
                            type="time"
                            value={backupSettings.backupTime}
                            onChange={(e) =>
                              setBackupSettings({
                                ...backupSettings,
                                backupTime: e.target.value,
                              })
                            }
                            className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Retention Period (days)
                          </label>
                          <input
                            type="number"
                            value={backupSettings.retentionDays}
                            onChange={(e) =>
                              setBackupSettings({
                                ...backupSettings,
                                retentionDays: parseInt(e.target.value),
                              })
                            }
                            className="w-32 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Backup Location
                          </label>
                          <select
                            value={backupSettings.backupLocation}
                            onChange={(e) =>
                              setBackupSettings({
                                ...backupSettings,
                                backupLocation: e.target.value,
                              })
                            }
                            className="w-48 px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                          >
                            <option>cloud</option>
                            <option>local</option>
                            <option>both</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-700 dark:text-slate-300">
                              Include Attachments
                            </p>
                            <p className="text-xs text-slate-400">
                              Backup files and images
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setBackupSettings({
                                ...backupSettings,
                                includeAttachments:
                                  !backupSettings.includeAttachments,
                              })
                            }
                            className="text-blue-600"
                          >
                            {backupSettings.includeAttachments ? (
                              <ToggleRight className="w-8 h-8" />
                            ) : (
                              <ToggleLeft className="w-8 h-8" />
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Backup Actions */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
                    Backup Actions
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Download className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Last Backup</p>
                          <p className="text-sm text-slate-500">
                            {backupSettings.lastBackup}
                          </p>
                          <p className="text-xs text-slate-400">
                            Size: {backupSettings.backupSize}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowBackupModal(true)}
                        className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Create New Backup
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Upload className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Restore System</p>
                          <p className="text-sm text-slate-500">
                            Restore from backup file
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowRestoreModal(true)}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Restore from Backup
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backup Confirmation Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Create Backup
              </h3>
              <p className="text-sm text-slate-500">
                Create a full system backup
              </p>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                      Backup Information
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                      This will create a complete backup of all system data
                      including users, branches, sales, inventory, and settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex gap-3">
              <button
                onClick={() => setShowBackupModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBackupModal(false);
                  handleSaveSettings();
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Start Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                Restore System
              </h3>
              <p className="text-sm text-slate-500">
                Restore system from backup
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      Warning
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                      Restoring will overwrite current data. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Select Backup File
                </label>
                <input
                  type="file"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                />
              </div>
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex gap-3">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Restore System
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemSettingsPage;

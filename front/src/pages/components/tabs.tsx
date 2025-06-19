"use client"

interface Tab {
    id: string
    label: string
    icon: string
}

interface TabsProps {
    tabs: Tab[]
    activeTab: string
    onTabChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex border-b bg-gray-50">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                            ? "bg-white border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                    }`}
                >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

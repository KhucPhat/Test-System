import { Typography } from "@mui/material";


function TestTabStepsTree() {
    const dataTabSteps = [
        {
            tabId: 1,
            tabName: 'Case 1',
            hasTab: true,
            childTabs: [
                {
                    tabId: 2,
                    tabName: 'Inputs',
                    hasTab: true,
                    childTabs: [
                        {
                            tabId: 3,
                            tabName: 'Test Bal Type',
                            hasTab: true,
                            childTabs: [
                                {
                                    tabId: 46,
                                    tabName: 'Attribute Tags',
                                    hasTab: true,
                                    childTabs: [
                                        {
                                            tabId: 4,
                                            tabName: 'Balance',
                                            hasTab: true,
                                            childTabs: []
                                        }
                                    ]
                                },
                                {
                                    tabId: 5,
                                    tabName: 'Characteristic',
                                    hasTab: false,
                                    charSpecUse: [
                                        {
                                            id: 6,
                                            name: 'Kied',
                                            value: 12
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tabId: 8,
                            tabName: 'Test Bal Type2',
                            hasTab: true,
                            childTabs: [
                                {
                                    tabId: 9,
                                    tabName: 'Attribute Tags',
                                    hasTab: true,
                                    childTabs: [
                                        {
                                            tabId: 10,
                                            tabName: 'Balance Red',
                                            hasTab: true,
                                            childTabs: []
                                        }
                                    ]
                                },
                                {
                                    tabId: 11,
                                    tabName: 'Characteristic',
                                    hasTab: false,
                                    charSpecUse: [
                                        {
                                            id: 6,
                                            name: 'Kied Ched',
                                            value: 12
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    tabId: 17,
                    tabName: 'Outputs',
                    hasTab: true,
                    childTabs: [
                        {
                            tabId: 19,
                            tabName: 'Test Bal Type Out',
                            hasTab: true,
                            childTabs: [
                                {
                                    tabId: 20,
                                    tabName: 'Attribute Tags',
                                    hasTab: true,
                                    childTabs: [
                                        {
                                            tabId: 21,
                                            tabName: 'Balance Out',
                                            hasTab: true,
                                            childTabs: []
                                        }
                                    ]
                                },
                                {
                                    tabId: 22,
                                    tabName: 'Characteristic',
                                    hasTab: false,
                                    charSpecUse: [
                                        {
                                            id: 36,
                                            name: 'Kied Out',
                                            value: 124
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            tabId: 30,
                            tabName: 'Test Bal Type2 Oy',
                            hasTab: true,
                            childTabs: [
                                {
                                    tabId: 39,
                                    tabName: 'Attribute Tags',
                                    hasTab: true,
                                    childTabs: [
                                        {
                                            tabId: 50,
                                            tabName: 'Balance Red',
                                            hasTab: true,
                                            childTabs: []
                                        }
                                    ]
                                },
                                {
                                    tabId: 40,
                                    tabName: 'Characteristic',
                                    hasTab: false,
                                    charSpecUse: [
                                        {
                                            id: 8,
                                            name: 'Kied Ched Out',
                                            value: 123
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];
    const updates = [
        { id: 6, name: 'Test Update', value: 100, parentTabId: 3 }
    ];

    function deepCopyAndUpdate(data, updates) {
        // Tạo bản sao sâu để tránh thay đổi trực tiếp dữ liệu ban đầu
        const newData = JSON.parse(JSON.stringify(data));

        // Đệ quy duyệt qua cấu trúc dữ liệu
        function applyUpdates(node) {
            node.forEach(item => {
                if (item.tabId === updates[0].parentTabId) {
                    console.log(item)
                    item.childTabs.forEach(child => {
                        if (child.charSpecUse) {
                            child.charSpecUse.forEach(char => {
                                const update = updates.find(u => u.id === char.id);
                                if (update) {
                                    // Cập nhật các thuộc tính từ update
                                    Object.assign(char, update);
                                }
                            });
                        }
                    });
                }
                if (item.childTabs) {
                    applyUpdates(item.childTabs); // Đệ quy nếu có childTabs
                }
            });
        }

        // Áp dụng cập nhật
        applyUpdates(newData);

        return newData;
    }

    const updatedData = deepCopyAndUpdate(dataTabSteps, updates);

    console.log(updatedData);
    return (
        <Typography>Test Steps</Typography>
    )

}


export default TestTabStepsTree;

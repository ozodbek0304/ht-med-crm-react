import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import React, { useState } from 'react';
import SettingsTable from './components/sektor-table';
import CustomerTable from './components/customer-table';
import EquipmentsTable from './components/equipments-table';
import Sector2Table from './components/sector2-table';
import { Plus } from 'lucide-react';
import AddNewOptionModalSettings from './components/add-settingsOption';
import PaymentMetodTable from './components/payment-metod.table';
import PaymentTypeTable from './components/payment-type.table';
import { Button } from '../../components/ui/button';

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('sector');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleModalClose = (open: boolean) => {
        setIsAddModalOpen(open);
    };

    return (
        <>
            <h3 className='text-[26px] my-5 font-semibold'>
                Sozlamalar
            </h3>
            <div className='my-5'>
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                    <div className='flex justify-between my-4 w-full'>
                        <div className='w-full'>
                            <TabsList>
                                <TabsTrigger
                                    value="sector"
                                    className="text-base px-4"
                                >
                                    Sektorlar
                                </TabsTrigger>
                                <TabsTrigger
                                    value="customer"
                                    className="text-base px-4"
                                >
                                    Xaridor kelish manbai
                                </TabsTrigger>
                                <TabsTrigger
                                    value="products"
                                    className="text-base px-4"
                                >
                                    Uskunalar
                                </TabsTrigger>
                                <TabsTrigger
                                    value="sector2"
                                    className="text-base px-4"
                                >
                                    Sektor (2 ilova)
                                </TabsTrigger>
                                <TabsTrigger
                                    value="paymentType"
                                    className="text-base px-4"
                                >
                                    To'lov turi
                                </TabsTrigger>
                                <TabsTrigger
                                    value="paymentMetod"
                                    className="text-base px-4"
                                >
                                    To'lov tartibi
                                </TabsTrigger>
                            </TabsList>
                        </div>
                        <div>
                            <Button onClick={openAddModal} size="md">
                                <Plus className="w-4 h-4 text-primary-foreground mr-2" />
                                Qo'shish
                            </Button>
                        </div>
                    </div>

                    <TabsContent className='w-[100%]' value='sector'>
                        <SettingsTable activeTab={activeTab} setActiveTab={setActiveTab} />
                    </TabsContent>

                    <TabsContent value='customer'>
                        <CustomerTable activeTab={activeTab} />
                    </TabsContent>

                    <TabsContent value='products'>
                        <EquipmentsTable activeTab={activeTab} />
                    </TabsContent>

                    <TabsContent value='sector2'>
                        <Sector2Table activeTab={activeTab} />
                    </TabsContent>
                    <TabsContent value='paymentType'>
                        <PaymentTypeTable activeTab={activeTab} />
                    </TabsContent>
                    <TabsContent value='paymentMetod'>
                        <PaymentMetodTable activeTab={activeTab} />
                    </TabsContent>
                </Tabs>
            </div>

            {isAddModalOpen && (
                <AddNewOptionModalSettings
                    selectType={activeTab}
                    setIsModalOpen={setIsAddModalOpen}
                    isOpen={isAddModalOpen}
                    onOpenChange={handleModalClose}
                    setSelectType={setActiveTab}
                />
            )}
        </>
    );
};

export default Settings;

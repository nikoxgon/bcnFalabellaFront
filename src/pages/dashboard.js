import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import React from 'react'
import EventCalendar from '@/components/Calendar'

const Dashboard = () => {
    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-neutral-300 leading-tight">
                    Calendario
                </h2>
            }>
            <Head>
                <title>Falabella - Calendario</title>
            </Head>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-neutral-800">
                            <EventCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard

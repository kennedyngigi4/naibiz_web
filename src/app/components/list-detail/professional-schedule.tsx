"use client";

import React from 'react';
import Link from 'next/link';


interface ProfessionalScheduleProps {
    professional: any;
}

export default function ProfessionalSchedule({ professional }: ProfessionalScheduleProps) {
    return (
        <div className="listingSingleblock mb-4" id="schedule">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#schedule" data-bs-target="#schedule" aria-controls="schedule" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">My Schedule</h4></Link>
            </div>

            <div id="schedule" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professional?.schedule?.map((item: any) => (
                                <tr key={item?.id}>
                                    <td>{item?.schedule_day}</td>
                                    <td>{item?.time_from}</td>
                                    <td>{item?.time_to}</td>
                                    <td>{item?.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

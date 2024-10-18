import React from 'react';
import PersonerSchedule from './PersonerSchedule';
import WorkSchedule from './WorkSchedule';

const Schedule = () => {
    return (
        <div className="sectionDevide h-[30rem] flex flex-row items-center justify-center">
            <div className="leftSite w-[50%]">
                <PersonerSchedule />
            </div>


            <div className="rightSite w-[50%]">
                <WorkSchedule />
            </div>


        </div>
    );
};

export default Schedule;

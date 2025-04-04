import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useRef, useState } from 'react';
import { ScheduleComponent, TimelineViews, Inject, ResourceDirective, ResourcesDirective, ViewsDirective, ViewDirective, Agenda, ToolbarItemsDirective, ToolbarItemDirective } from '@syncfusion/ej2-react-schedule';
import { closest, remove, addClass, Internationalization } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './Employee Shift Management/style.css';
import { ChipListComponent, ChipsDirective, ChipDirective } from '@syncfusion/ej2-react-buttons';
import salamanImage from './Avatar/salman@3x.png';
import brianImage from './Avatar/brian@3x.png';
import jakeImage from './Avatar/jake@3x.png';
import jenniferImage from './Avatar/Jennifer.png';
import davidImage from './Avatar/David.png';
import williammImage from './Avatar/William.png';
import emmaImage from './Avatar/Emma.png';
import lilyImage from './Avatar/Lily.png';
import avaImage from './Avatar/Ava.png';
import graceImage from './Avatar/Grace.png';
import michaelImage from './Avatar/Michael.png';
import thomasImage from './Avatar/Thomas.png';
import rickyImage from './Avatar/Ricky.png';
import jamesImage from './Avatar/James.png';
import benjaminImage from './Avatar/Benjamin.png';
import oliviaImage from './Avatar/Olivia.png';
import chloeImage from './Avatar/Chloe.png';
import { Query } from '@syncfusion/ej2-data';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { L10n, setCurrencyCode } from '@syncfusion/ej2-base';
import { Locale } from './common/locale.ts';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const intl = new Internationalization();

const employeeRole = [
    { role: 'Doctors', id: 1 },
    { role: 'Nurses', id: 2 },
    { role: 'Support Staffs', id: 3 }
];

const designationsData = [
    { name: 'Attending Physician', id: 1, groupId: 1 },
    { name: 'Hospitalist', id: 2, groupId: 1 },
    { name: 'General Pediatrician', id: 3, groupId: 1 },
    { name: 'Resident Doctor', id: 4, groupId: 1 },
    { name: 'Senior Nurse', id: 5, groupId: 2 },
    { name: 'Nurse Practitioner', id: 6, groupId: 2 },
    { name: 'Medical Assistant', id: 7, groupId: 3 },
    { name: 'Receptionist', id: 8, groupId: 3 }
];

const employeeImages = [
    { name: 'John', image: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/robert.png' },
    { name: 'Nashil', image: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/nancy.png' },
    { name: 'Jennifer', image: jenniferImage },
    { name: 'William', image: williammImage },
    { name: 'David', image: davidImage },
    { name: 'Michael', image: michaelImage },
    { name: 'Thomas', image: thomasImage },
    { name: 'Daniel', image: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/robson.png' },
    { name: 'Mark', image: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/will-smith.png' },
    { name: 'Brian', image: brianImage },
    { name: 'Kevin', image: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/alice.png' },
    { name: 'Salman', image: salamanImage },

    { name: 'Emma', image: emmaImage },
    { name: 'Lily', image: lilyImage },
    { name: 'Ava', image: avaImage },
    { name: 'Grace', image: graceImage },
    { name: 'Olivia', image: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/margaret.png' },
    { name: 'Zoe', image: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/laura.png' },

    { name: 'James', image: jamesImage },
    { name: 'Benjamin', image: benjaminImage },
    { name: 'Olivia', image: oliviaImage },
    { name: 'Chloe', image: chloeImage },
    { name: 'Ricky', image: rickyImage },
    { name: 'Jake', image: jakeImage },
];

let eventData = [
    { Id: 1, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 2, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 3, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 4, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 5, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 6, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 7, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 8, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 9, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 10, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 11, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 12, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 13, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Available (Day Shift)" },

    { Id: 15, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Jennifer", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 16, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 17, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Jennifer", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 18, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 19, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Jennifer", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 20, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 21, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Jennifer", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 22, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 23, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Jennifer", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 24, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 25, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Jennifer", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 26, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 27, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Jennifer", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },

    { Id: 29, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 30, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Michael", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 31, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 32, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Michael", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 33, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 34, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Michael", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 35, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Leave (Day Shift)" },
    { Id: 36, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Michael", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 37, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 38, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Michael", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 39, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 40, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Michael", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 41, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },

    { Id: 43, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 44, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 45, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 46, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 47, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 48, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 49, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 50, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 51, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 52, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Leave (Night Shift)" },
    { Id: 53, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 54, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 55, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Available (Day Shift)" },

    { Id: 57, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 58, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 59, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 60, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 61, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 62, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 63, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 64, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 65, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 66, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 67, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 68, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 115, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Leave (Day Shift)" },

    { Id: 71, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 72, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 73, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 74, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 75, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 76, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 77, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 78, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 79, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 80, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 81, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 82, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 83, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Available (Day Shift)" },

    { Id: 85, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 86, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 87, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 88, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 89, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 90, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 91, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 92, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 93, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 94, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 95, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 96, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Leave (Night Shift)" },
    { Id: 97, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Available (Day Shift)" },

    { Id: 99, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 100, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-02T09:30:00.000Z"), EndTime: new Date("2025-03-02T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 101, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 102, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-03T09:30:00.000Z"), EndTime: new Date("2025-03-03T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 103, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T09:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 104, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-04T09:30:00.000Z"), EndTime: new Date("2025-03-04T17:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 105, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 106, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-05T09:30:00.000Z"), EndTime: new Date("2025-03-05T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 107, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 108, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-06T09:30:00.000Z"), EndTime: new Date("2025-03-06T17:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 109, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T09:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 110, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-07T09:30:00.000Z"), EndTime: new Date("2025-03-07T17:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 111, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T09:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
];

const group = {
    resources: ['Roles', 'Designations']
};

const majorSlotTemplate = (props) => {
    return (<div>{intl.formatDate(props.date, { skeleton: 'hm' }) === '7:00 AM' ? 'Morning Shift' : 'Evening Shift'}</div>);
}

// const minorSlotTemplate = (props) => {
//     return (<div>{intl.formatDate(props.date, { skeleton: 'hm' }) === '8:00 AM' ? '8 AM' : ( intl.formatDate(props.date, { skeleton: 'hm' }) === '8:00 PM' ? '8 PM' : '')}</div>);
// }

const timeScale = {
    enable: true,
    interval: 480,
    slotCount: 3,
    majorSlotTemplate: majorSlotTemplate.bind(this),
    // minorSlotTemplate: minorSlotTemplate.bind(this)
};

const workHours = { start: '00:00', end: '23:59' };

function App() {
    const scheduleObj = useRef(null);
    const dialogInstance = useRef(null);

    const selectedDate = new Date(2025, 2, 5);
    

    const [isRtl, setRtl] = useState(false);

    const [employeeList, assignEmp] = useState([]);
    const [shiftList, assignShift] = useState([]);

    const [selectedEmployee, setEmployee] = useState([]);
    const [selectedShift, setShift] = useState([]);

    const [reqShift, setReqShift] = useState([]);


    let animationSettings;
    let buttons;
    const [status, setStatus] = useState(false);
    animationSettings = { effect: 'None' };
    buttons = [
        {
            click: () => {
                setStatus(false);
            },
            buttonModel: {
                content: 'CANCEL',
            }
        },
        {
            // Click the footer buttons to hide the Dialog
            click: (e) => {
                let dataSource = scheduleObj.current.eventSettings.dataSource;
                let reqEventIndex;
                let reqShiftIds = reqShift.id;
                let reqEvent = dataSource.filter((item, index) => {
                    if (item.Id === reqShiftIds) {
                        reqEventIndex = index;
                        return true;
                    }
                    return false;
                });
                
                let accEventIndex;
                let accShiftIds = selectedShift.eventId;
                let accEvent = dataSource.filter((item, index) => {
                    if (item.Id === accShiftIds) {
                        accEventIndex = index;
                        return true;
                    }
                    return false;
                });


                reqEvent[0].Description = selectedEmployee.name;
                reqEvent[0].Subject = reqShift.name + ' swapped the shift with ' + selectedEmployee.name + '’s shift scheduled from ' + (intl.formatDate(accEvent[0].StartTime, { skeleton: 'MMMd' }) + ', ' + getTimeString(accEvent[0].StartTime) + ' to ' + intl.formatDate(accEvent[0].EndTime, { skeleton: 'MMMd' }) + ', ' + getTimeString(accEvent[0].EndTime));
                dataSource[reqEventIndex] = reqEvent[0];

                accEvent[0].Description = reqShift.name ;
                accEvent[0].Subject = selectedEmployee.name + ' swapped the shift with ' + reqShift.name + '’s shift scheduled from ' + (intl.formatDate(reqEvent[0].StartTime, { skeleton: 'MMMd' }) + ', ' + getTimeString(reqEvent[0].StartTime) + ' to ' + intl.formatDate(reqEvent[0].EndTime, { skeleton: 'MMMd' }) + ', ' + getTimeString(reqEvent[0].EndTime));
                dataSource[accEventIndex] = accEvent[0];

                scheduleObj.current.eventSettings.dataSource = dataSource;
                scheduleObj.current.refreshEvents();

                assignEmp([]);
                assignShift([]);
                setStatus(false);
            },
            // Accessing button component properties by buttonModel property
            buttonModel: {
                content: 'Swap Shift',
            },
        },
    ];

    const dialogClose = () => {
        // setStatus(false);
    }

    const dialogOpen = () => {
        // setStatus(true);
    }

    const getTimeString = (value) => {
        return intl.formatDate(value, { skeleton: 'h' });
    }

    // const getTimeString = (value) => {
    //     return intl.formatDate(value, { skeleton: 'h' });
    // }

    const [shiftsData, setShiftsData] = useState([]);

    // Function to Handle Shift Swap Request
    function requestShiftSwap(args) {
        const eventsData = scheduleObj.current.eventSettings.dataSource;
        const eventDetails = scheduleObj.current.getEventDetails((args.element));
        const roleId = eventDetails.RoleId;
        const designationId = eventDetails.DesignationId;
        const employeeName = eventDetails.Subject;
        let filteredData;

        let employeesData1 = [];
        let shiftsData1 = [];
        filteredData = eventsData.filter((item) => item.Description.toLowerCase().includes('swap-request') && item.RoleId === roleId && item.DesignationId === designationId && item.Subject !== employeeName);
        filteredData.forEach((item) => {
            if (employeesData1.length === 0 || !employeesData1.some((EmpItem) => EmpItem.name === item.Subject)) {
                employeesData1.push({ id: item.DesignationId, name: item.Subject, employeeId: item.EmployeeId });
            }

            shiftsData1.push({ id: shiftsData1.length + 1, name: (intl.formatDate(item.StartTime, { skeleton: 'MMMd' }) + ' ' + getTimeString(item.StartTime) + ' - ' + intl.formatDate(item.EndTime, { skeleton: 'MMMd' }) + ' ' + getTimeString(item.EndTime)), designationId: item.DesignationId, employeeId: item.EmployeeId, eventId: item.Id });

        });
        setReqShift({ id: eventDetails.Id, name: employeeName });
        setShiftsData(shiftsData1);
        assignEmp(employeesData1);
        dialogInstance.current.enableRtl = scheduleObj.current.enableRtl;
        setStatus(true);
    }

    const dropDownListChange1 = (args) => {
        if (args.itemData) {
            let shiftColl = shiftsData.filter((item) => item.designationId === args.itemData.id && item.employeeId === args.itemData.employeeId);
            assignShift(shiftColl);
            setEmployee(args.itemData);
        }

    }

    const dropDownListChange2 = (args) => {
        setShift(args.itemData);
    }

    const getEventElement = (props, element, isOvertime) => {
        let isDefaultEventEle = true;
        let isSwappedEvent = props.Subject.includes('swapped');
        let isLeaveReplaced = false;
        let employeeName = props.Subject;
        if (props.Subject.includes('covers for')) {
            isLeaveReplaced = true;
            employeeName = props.Description;
        }
        if (isSwappedEvent) {
            employeeName = props.Description;
        }
        let imageData = employeeImages.filter((item) => item.name === employeeName);
        let imageUrl = '';
        if (imageData.length > 0) {
            imageUrl = imageData[0].image;
        }
        if (isDefaultEventEle) {
            // Create the main wrapper div
            const templateWrap = document.createElement('div');
            templateWrap.className = 'template-wrap';

            // Create the staff container div
            const staffWrap = document.createElement('div');
            staffWrap.className = 'e-staff';

            // Create the staff image div
            const staffImage = document.createElement('img');
            staffImage.className = 'staff-image';
            // staffImage.textContent = props.Subject.charAt(0);
            staffImage.src = imageUrl === '' ? 'https://ej2.syncfusion.com/react/demos/src/schedule/images/alice.png' : imageUrl;

            // Create the staff info div
            const staffInfo = document.createElement('div');
            staffInfo.className = 'staff-info';

            // Create and append the staff name
            const name = document.createElement('div');
            name.className = 'e-name';
            name.innerHTML = props.Description.toLowerCase().includes('leave') && !props.Subject.toLowerCase().includes('covers') ? props.Description.split('(')[0].trim() : (isSwappedEvent || isLeaveReplaced ? employeeName : props.Subject);

            // Create and append the staff designation
            const designation = document.createElement('div');
            designation.className = 'e-designation';
            designation.textContent = getTimeString(props.StartTime) + ' - ' + getTimeString(props.EndTime);

            // Append name and designation to staffInfo
            staffInfo.appendChild(name);
            staffInfo.appendChild(designation);

            // Append staffImage and staffInfo to staffWrap
            staffWrap.appendChild(staffImage);
            staffWrap.appendChild(staffInfo);

            // Append staffWrap and timeDiv to templateWrap
            templateWrap.appendChild(staffWrap);

            // Return the full element
            return templateWrap;
        }
    };

    let tooltipInstance = useRef(null);

    const onEventRendered = (args) => {
        let startTime = getTimeString(args.data.StartTime);
        if (startTime === '7 AM') {
            args.element.classList.add('day-shift');
        } else {
            args.element.classList.add('night-shift');
        }
        const innerWrap = args.element.querySelector('.e-inner-wrap');
        if (innerWrap) {
            innerWrap.innerHTML = '';
            const elementToAppend = getEventElement(args.data, args.element);

            let appointmentWidth = parseInt(args.element.style.width.split('px')[0],10) - 6;
            args.element.style.width = appointmentWidth + 'px';
            innerWrap.appendChild(elementToAppend);

            if (!args.element.classList.contains('e-read-only')) {
                let groupIndex = args.element.getAttribute('data-group-index');
                args.element.classList.add(groupIndex === '0' ? 'doctors-event' : (groupIndex === '1' ? 'nurses-event' : 'staffs-event'));
            }
        }

        if (args.data.Description.toLowerCase().includes('leave')) {
            args.element.classList.add('event-leave');

            // Create a container div for React rendering
            const reactContainer = document.createElement('span');
            reactContainer.className = "e-icon-element";
            args.element.appendChild(reactContainer);

            // Define the icon with tooltip using React
            const LeaveIconWithTooltip = () => {
                const iconRef = React.useRef(null);
                let employeeName = args.data.Subject;
                return (
                    <TooltipComponent ref={tooltipInstance} content= {`${employeeName} is on leave. To cover this shift, drag a staff member with the same designation from the available list and drop them here.`} position="RightCenter">
                        <span
                            ref={iconRef}
                            className="e-leave e-icons"
                            style={{ 
                                cursor: 'pointer'
                             }}
                        ></span>
                    </TooltipComponent>
                );
            };
            // Render Tooltip + Icon inside Scheduler event
            ReactDOM.createRoot(reactContainer).render(<LeaveIconWithTooltip />);
        }
        if (args.data.Subject.includes('covers for')) {
            args.element.classList.add('e-covers');
            if (args.element.classList.contains('event-leave')) {
                args.element.classList.remove('event-leave');
            }
            // let employees = args.data.Subject.split(' covers for ');

            // let replaceEmployeeName = employees[0];
            // let shiftEmployeeName = employees[1];

            let reactContainer = args.element.querySelector('.e-icon-element');

            if (!reactContainer) {
                reactContainer = document.createElement('span');
                reactContainer.className = "e-icon-element";
                args.element.appendChild(reactContainer);
            }

            const LeaveReplacedIconWithTooltip = () => {
                const iconRef = React.useRef(null);
                return (
                    <TooltipComponent ref={tooltipInstance} content= 'Leave covered by replacement' position="RightCenter">
                        <span
                            ref={iconRef}
                            className="e-icons e-replaced sf-icon-user-replace"
                            style={{ 
                                cursor: 'pointer'
                             }}
                        ></span>
                    </TooltipComponent>
                );
            };
            // Render Tooltip + Icon inside Scheduler event
            ReactDOM.createRoot(reactContainer).render(<LeaveReplacedIconWithTooltip />);
        }
        if (args.data.Description.toLowerCase().includes('swap-request') && !args.data.Subject.toLowerCase().includes('swapped') && scheduleObj.current.currentView !== 'Agenda') {
            args.element.classList.add('event-swap');

            // Create a container div for React rendering
            const reactContainer = document.createElement('span');
            reactContainer.className = "e-icon-element";
            args.element.appendChild(reactContainer);

            // Define the icon with tooltip using React
            const SwapIconWithTooltip = () => {
                const iconRef = React.useRef(null);
                React.useEffect(() => {
                    const el = iconRef.current;
                    if (el) {
                        el.addEventListener('click', (event) => {
                            if (event.target.classList.contains('sf-icon-replace-request')) {
                                requestShiftSwap(args);
                            }
                        });
                    }

                    // Cleanup
                    return () => {
                        if (el) {
                            el.removeEventListener('click', requestShiftSwap);
                        }
                    };
                }, []);

                return (
                    <TooltipComponent content="Click here to swap shift" position="RightCenter">
                        <span
                            ref={iconRef}
                            className="e-swap e-icons sf-icon-replace-request"
                            style={{ 
                                cursor: 'pointer', marginLeft: '5px'
                             }}
                        ></span>
                    </TooltipComponent>
                );
            };
            // Render Tooltip + Icon inside Scheduler event
            ReactDOM.createRoot(reactContainer).render(<SwapIconWithTooltip />);
        }
        if (args.data.Subject.toLowerCase().includes('swapped')) {
            if (args.element.classList.contains('event-swap')) {
                args.element.classList.remove('event-swap');
            }
            args.element.classList.add('event-swapped');

            // Create a container div for React rendering
            const reactContainer = document.createElement('span');
            reactContainer.className = "e-icon-element";
            args.element.appendChild(reactContainer);

            // Define the icon with tooltip using React
            const ShiftSwappedIconWithTooltip = () => {
                const iconRef = React.useRef(null);
                return (
                    <TooltipComponent content='This shift has been swapped'  position="RightCenter">
                        <span
                            ref={iconRef}
                            className="e-swapped e-icons sf-icon-replace-accepted"
                            style={{ 
                                cursor: 'pointer'
                             }}
                        ></span>
                    </TooltipComponent>
                );
            };
            // Render Tooltip + Icon inside Scheduler event
            ReactDOM.createRoot(reactContainer).render(<ShiftSwappedIconWithTooltip />);
        }

        if (args.element.classList.contains('day-shift') && args.element.classList.contains('e-overtime') && args.element.querySelector('.e-right-icon')) {
            args.element.querySelector('.e-right-icon').remove();
        }
        return;
    };


    const onActionBegin = (event) => {
        if (event.requestType === 'eventChange' && isTreeItemDropped) {
            let listObjects = [treeObj1, treeObj2, treeObj3, treeObj4];
            let treeObj = listObjects[activeTab].current;
            let treeViewData = treeObj.fields.dataSource;
            const filteredPeople = treeViewData.filter((item) => item.Id !== parseInt(draggedItemId, 10));
            treeObj.fields.dataSource = filteredPeople;
            let elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let i = 0; i < elements.length; i++) {
                remove(elements[i]);
            }

            allData = allData.filter((item) => item.Id !== parseInt(draggedItemId, 10));

            event.data.Description = event.data.Subject.split(' covers for')[0];
            isTreeItemDropped = false;
        }
    };

    const resizeStart = (args) => {
        if (args.event.target.classList.contains('e-left-handler') || args.data.Description.toLowerCase().includes('leave')) {
            args.cancel = true;
        }
        args.interval = 30;
    }
    const resizing = (args) => {

    }

    const resizeStop = (args) => {
        const eventDetails = scheduleObj.current.getEventDetails(args.element);
        const updatedEventDetails = args.data;
        args.cancel = true;
        if (eventDetails.Description.toLowerCase().includes('leave')) {
            return;
        }

        var startTime = updatedEventDetails.StartTime; // Example start time
        var endTime = updatedEventDetails.EndTime;   // Example end time

        // Get time difference in milliseconds
        var timeDifference = endTime.getTime() - startTime.getTime();

        var differenceInHours = timeDifference / (1000 * 60 * 60);

        if (differenceInHours <= 12) {
            if (eventDetails.Description.toLowerCase().includes('overtime')) {
                eventDetails.Description = eventDetails.Description.replace('- Overtime', '');
            }
        } else {
            if (!eventDetails.Description.toLowerCase().includes('overtime')) {
                eventDetails.Description += '- Overtime';
            }

        }


        eventDetails.StartTime = updatedEventDetails.StartTime;
        eventDetails.EndTime = updatedEventDetails.EndTime;
        scheduleObj.current.openEditor(eventDetails, 'EditOccurrence');

    }



    const doctorsData = [
        { Id: 1, Name: "Mark", Description: 'Attending Physician', role: 'Doctors' },
        { Id: 2, Name: "Brian", Description: 'Hospitalist', role: 'Doctors' },
        { Id: 3, Name: "Kevin", Description: 'General Pediatrician', role: 'Doctors' },
        { Id: 4, Name: "Salman", Description: 'Resident Doctor', role: 'Doctors' }
    ];

    const nursesData = [
        { Id: 5, Name: "Olivia", Description: 'Senior Nurse', role: 'Nurses' },
        { Id: 6, Name: "Zoe", Description: 'Nurse Practitioner', role: 'Nurses' }
    ];

    const staffsData = [
        { Id: 7, Name: "Ricky", Description: 'Medical Assistant', role: 'Support Staffs' },
        { Id: 8, Name: "Jake", Description: 'Receptionist', role: 'Support Staffs' }
    ];


    let allData = doctorsData.concat(nursesData, staffsData);


    let chipsInstance = useRef(null);
    let chipsInstance1 = useRef(null);

    let treeObj1 = useRef(null);
    let treeObj2 = useRef(null);
    let treeObj3 = useRef(null);
    let treeObj4 = useRef(null);
    let styleNone = { display: "none" };
    let isTreeItemDropped = false;
    let draggedItemId = '';
    const allowDragAndDrops = true;
    const fields1 = { dataSource: allData, id: 'Id', text: 'Name' };
    const fields2 = { dataSource: doctorsData, id: 'Id', text: 'Name' };
    const fields3 = { dataSource: nursesData, id: 'Id', text: 'Name' };
    const fields4 = { dataSource: staffsData, id: 'Id', text: 'Name' };
    const imageMap = {
        mark: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/will-smith.png',
        brian: brianImage,
        kevin: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/alice.png',
        salman: salamanImage,
        olivia: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/margaret.png',
        zoe: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/laura.png',
        ricky: rickyImage,
        jake: jakeImage,
    };
    const treeTemplate = (props) => {
        return (<div id="waiting">
            <div id="waitdetails">
                {/* <div className={"employee-image"} /> */}
                <img className="employee-image" src={imageMap[props.Name.toLowerCase()]} alt="Your" />
                <div className="text-container">
                    <div id="waitlist">{props.Name}</div>
                    <div id="waitcategory">{props.Description}</div>
                </div>
            </div>
        </div>);
    };
    const onItemSelecting = (args) => {
        args.cancel = true;
    };
    const onTreeDrag = (event) => {
        if (scheduleObj.current.isAdaptive) {
            let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                addClass([event.target], 'e-device-hover');
            }
        }
    };

    const onTreeDragStop = (event) => {
        let treeElement = closest(event.target, '.e-treeview');
        let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement = closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                let treeviewData = treeObj1.current.fields.dataSource;
                let target = closest(event.target, '.e-appointment.event-leave');
                if (target) {
                    const filteredData = treeviewData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
                    let eventDetails = { ...scheduleObj.current.getEventDetails(target) };

                    // const category = treeviewData.filter((item) => item.Id === parseInt(filteredData[0].PId, 10));
                    const role = employeeRole.filter((item) => item.id === parseInt(eventDetails.RoleId, 10))[0].role;
                    const designation = designationsData.filter((item) => item.id === parseInt(eventDetails.DesignationId, 10))[0].name;
                    if (role === filteredData[0].role && designation === filteredData[0].Description) {
                        // let resourceDetails = scheduleObj.current.getResourcesByIndex(eventDetails.EmployeeId);
                        eventDetails.Subject = filteredData[0].Name + ' covers for ' + eventDetails.Subject;
                        eventDetails.Designation = filteredData[0].Description;


                        isTreeItemDropped = true;

                        scheduleObj.current.openEditor(eventDetails, 'EditOccurrence');

                        draggedItemId = event.draggedNodeData.id;
                    }
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    };

    const onTreeDragStart = () => {
        document.body.classList.add('e-disble-not-allowed');
    };

    let listObjects = [];
    let activeTab = 0;
    let type = ['', 'Doctors', 'Nurses', 'Support Staffs'];

    const filterData = (dataSource, value) => {
        let newData = dataSource.filter((data) => data.role === value);
        return newData;
    }

    let PrevSelectedItem = 0;

    const onBeforeClick = (args) => {
        PrevSelectedItem = chipsInstance.current.selectedChips;
    }

    const chipClick = (args) => {
        if (treeObj1 !== undefined) {
            activeTab = chipsInstance.current.selectedChips;
            listObjects = [treeObj1, treeObj2, treeObj3, treeObj4];
            listObjects[PrevSelectedItem].current.element.style.display = 'none';
            listObjects[activeTab].current.element.style = {};

            let newData;
            if (activeTab === 0) {
                listObjects[activeTab].current.fields.dataSource = allData;
            } else {
                newData = filterData(allData, type[activeTab]); // Filter the data while selecting tab
                listObjects[activeTab].current.fields.dataSource = newData;
            }
        }
    }



    const toolbarRef = useRef(null);
    const dropdownListRef = useRef(null);

    let [filteredQuery, setFilteredQuery] = useState(new Query());
    let [selectedChip, setChipSelection] = useState(0);
    // let [query, setQuery] = useState(new Query().where('RoleId', 'contains', filter, true));


    const enableAgendaToolbar = () => {
        const toolbarElement = toolbarRef.current.element;
        if (toolbarElement.classList.contains('e-hidden')) {
            toolbarElement.classList.remove('e-hidden');
        }
        toolbarElement.style.height = '72px';
        toolbarElement.style.width = '100%';
    }

    const onNavigating = (args) => {
        let scheduleToolbar = scheduleObj.current.element.querySelector('.e-schedule-toolbar-container');
        if (args.currentView === 'Agenda') {
            setEmployeesNames([]);
            setDdlValue('');
            setChipSelection(0);
            enableAgendaToolbar();
            const toolbarElement = toolbarRef.current.element;
            scheduleToolbar.appendChild(toolbarElement);
        } else {
            if (scheduleObj.current.eventSettings.query) {
                scheduleObj.current.eventSettings.query.queries = [];
                if (scheduleToolbar.querySelector('.agenda-toolbar')) {

                    const toolbarElement = scheduleToolbar.querySelector('.agenda-toolbar');
                    if (!toolbarElement.classList.contains('e-hidden')) {
                        toolbarElement.classList.add('e-hidden');
                    }
                }
            }
        }
    }

    const onDdlChange = (args) => {
        let employeeName = args.itemData.value;

        let query = new Query();
        let filter = employeeName

        query = query.where('Subject', 'contains', filter, true);
        setFilteredQuery(query);

        setEmployeesNames(dropdownListRef.current.dataSource);
        setDdlValue(employeeName);


        // let selectedEmpData = employeeRole.find(item => item.role.indexOf(args.data.text) !== -1);
        // setFilter(employeeName);
        // scheduleObj.current.eventSettings.query = new Query().where('Subject', 'contains', filter, true);
    }

    const onBeforeOpen = (args) => {
        const activeChip = chipsInstance1.current.selectedChips;

        let dataSource = scheduleObj.current.eventSettings.dataSource;
        let uniqueSubjects = (dataSource).filter((item) => item.RoleId === activeChip);

        uniqueSubjects = [...new Set((activeChip === 0 ? dataSource : uniqueSubjects).map(obj => obj.Subject))];

        // Step 2: Create new array of objects with 'text' and 'id'
        const newObjectsArray = uniqueSubjects.map((subject, index) => (
            subject
        ));
        // setEmployeesNames(newObjectsArray);

        dropdownListRef.current.dataSource = newObjectsArray;
    }

    const getChips = () => {
        return (<div>
            <ChipListComponent ref={chipsInstance1} id="chip-avatar" enableRtl={isRtl} selection="Single" cssClass="e-outline" selectedChips={[selectedChip]} aria-labelledby="choiceChips" click={chipClick1.bind(this)}>
                <ChipsDirective>
                    <ChipDirective text="All" />
                    <ChipDirective text="Doctors" />
                    <ChipDirective text="Nurses" />
                    <ChipDirective text="Staffs" />
                </ChipsDirective>
            </ChipListComponent>
        </div>);
    }

    const [employeesNames, setEmployeesNames] = useState([]);
    const [ddlValue, setDdlValue] = useState('');

    const getDdl = () => {
        return (<div>
            <DropDownListComponent
                ref={dropdownListRef}
                // fields={{ text: 'name', value: 'id' }}
                dataSource={employeesNames}
                value={ddlValue}
                change={onDdlChange}
                placeholder="Select an employee"
                popupHeight="220px"
                beforeOpen={onBeforeOpen}
            />
        </div>);
    }


    const chipClick1 = (args) => {

        let selectedEmpData = employeeRole.find(item => item.role.indexOf(args.data.text) !== -1);

        let query = new Query();
        let filter = selectedEmpData ? selectedEmpData.id : '';

        query = query.where('RoleId', 'contains', filter, true);
        setFilteredQuery(query);

        setChipSelection(args.index);

        setDdlValue('');
    }

    const onDataBound = (args) => {
        if (scheduleObj.current.currentView === 'Agenda') {
            enableAgendaToolbar();
        }
    }

    const editorHeaderTemplate = (props) => {
        return (
            <div id="event-header">
                {(props !== undefined) ? (props.Subject && (props.Subject).includes('covers for') && isTreeItemDropped ? <div>Leave Replacement</div> : <div>Edit Event</div>) : <div></div>}
            </div>
        );
    }


    const agendaTemplate = (props) => {
        const staffImage = document.createElement('div');
        staffImage.className = 'staff-image';
        staffImage.textContent = props.Subject.charAt(0);
        const role = employeeRole.filter((item) => item.id === parseInt(props.RoleId, 10))[0].role;
        const designation = designationsData.filter((item) => item.id === parseInt(props.DesignationId, 10))[0].name;
        return (
            <div className="agenda-event">
                <div className='e-staff'>
                    <div className='staff-image'>
                        {props.Subject.charAt(0)}
                    </div>
                    <div className='event-details'>
                        <div className="staff-info">
                            <span className='staff-name'>{props.Subject} </span>
                            <span className='staff-role'>{role} </span>
                            <span className='staff-designation'>({designation})</span>
                            <span className='staff-availability'>{props.Description.toLowerCase().includes('leave') ? ' - On Leave' : ''}</span>
                        </div>
                        <div className="event-time">
                            <label>Shift Time</label>: {getTimeString(props.StartTime) + ' - ' + getTimeString(props.EndTime)}
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    let ddl1 = [
        { id: "en-US USD", name: 'English' },
        { id: "de EUR", name: 'German' },
        { id: "fr-CH CHF", name: 'French' },
        { id: "ar AED", name: 'Arabic' },
        { id: "zh CNY", name: 'Chinese' }
    ];

    let ddl2 = [
        { id: 'USD', name: 'USD' },
        { id: 'EUR', name: 'EUR' },
        { id: 'AED', name: 'AED' },
        { id: 'CHF', name: 'CHF' },
        { id: 'CNY', name: 'CNY' }
    ]

    const onDdl1Change = (args) => {
        const localeOption = args.value.split(' ');
        if (localeOption[0] === 'ar') {
            setRtl(true);
        } else {
            setRtl(false);
        }
        if (scheduleObj.current) {
            scheduleObj.current.locale = localeOption[0];
        }
        // setCulture(localeOption[0]);
        // setCurrencyCode(localeOption[1]);
        // enableRtl(localeOption[0].startsWith('ar'));
        // scheduleObj.dataBind();
        // applyFormats();
    }

    const onDdl2Change = (args) => {
        setCurrencyCode(args.value);

        // const localeOption = scheduleObj.current.locale.split(' ');
        // if (scheduleObj.current) {
        //     scheduleObj.current.locale = localeOption[0] + ' ' + args.value;
        // }
    }

    const loadLocalization = () => {
        L10n.load(Locale.getLocaleObj());
        const localeCollection = ['ar', 'de', 'en', 'fr-CH', 'zh'];
        localeCollection.forEach((locale) => Locale.loadCultureFiles(locale));
    };

    loadLocalization();

    const onPopupOpen =(args) => {
        if ((args.type === 'QuickInfo' && args.data.IsReadonly) || (args.type === 'Editor' && !isTreeItemDropped)) {
            args.cancel = true;
        }
    }

    // const getEmployeeName = (value) => {
    //     return value.resourceData[value.resource.textField];
    // };

    // const resourceHeaderTemplate = (props) => {
    //     if (props.resource.name === 'Roles') {
    //         const roleImage = props.resourceData.id === 1 ? doctorImage : (props.resourceData.id === 2 ? NurseImage : StaffImage);
    //         return (<div className="role-template-wrap">
    //             <div className="e-role">
    //                 <img className="role-image" src={roleImage} alt="Yours" />
    //                 <div className="role-text">{getEmployeeName(props)}</div>
    //             </div>

    //             {/* <div className={"employee-image " + getEmployeeImage(props)} />
    //                 <div className="employee-name"> </div>
    //                 <div className="employee-designation">{getEmployeeDesignation(props)}</div> */}

    //         </div>);
    //     } else {
    //         return (<div className="e-resource-text">{props.resourceData.role}</div>);
    //     }
    // };


    return (<div className='schedule-control-section'>
        <div className='e-localization'>
            <div className='e-culture'>
                <div className="title-text">Localization</div>
                <DropDownListComponent
                    dataSource={ddl1}
                    fields={{ text: 'name', value: 'id' }}
                    placeholder="Select Localization"
                    value='en-US USD'
                    change={onDdl1Change}
                />
            </div>

            <div className='e-currency'>

                <div className="title-text">Currency</div>

                <DropDownListComponent
                    dataSource={ddl2}
                    fields={{ text: 'name', value: 'id' }}
                    placeholder="Select Currency"
                    value='USD'
                    change={onDdl2Change}
                />
            </div>
        </div>
        <div className='col-lg-12 control-section'>
            <div className='content-wrapper drag-sample-wrapper'>
                {/* <div className="title-container">
                        <h1 className="title-text">Employee Shift Management</h1>
                    </div> */}
                <ScheduleComponent
                    ref={scheduleObj}
                    locale='en-US'
                    enableRtl={isRtl}
                    currentView="TimelineWeek"
                    selectedDate={selectedDate}
                    cssClass='schedule-drag-drop'
                    width='100%'
                    height='100%'
                    startHour="07:00"
                    endHour='23:00'
                    group={group}
                    eventSettings={{ dataSource: eventData, query: filteredQuery }}
                    timeScale={timeScale}
                    workHours={workHours}
                    showTimeIndicator={true}
                    // showQuickInfo={false}
                    eventRendered={onEventRendered}
                    //    resourceHeaderTemplate={resourceHeaderTemplate}
                    resizeStart={resizeStart}
                    resizing={resizing}
                    resizeStop={resizeStop}
                    actionBegin={onActionBegin}
                    navigating={onNavigating}
                    dataBound={onDataBound}
                    editorHeaderTemplate={editorHeaderTemplate}
                    popupOpen={onPopupOpen}
                >

                    <ViewsDirective>
                        <ViewDirective option="TimelineWeek" />
                        <ViewDirective option='Agenda' eventTemplate={agendaTemplate} />
                    </ViewsDirective>

                    <ResourcesDirective>
                        <ResourceDirective
                            field="RoleId"
                            title="Roles"
                            name="Roles"
                            dataSource={employeeRole}
                            textField="role"
                            idField="id"
                        />
                        <ResourceDirective
                            field="DesignationId"
                            title="Designations"
                            name="Designations"
                            allowMultiple={true}
                            dataSource={designationsData}
                            textField="name"
                            idField="id"
                            groupIDField="groupId"
                        />
                    </ResourcesDirective>
                    <Inject services={[TimelineViews, Agenda]} />
                    <ToolbarItemsDirective>
                        <ToolbarItemDirective name='Previous' align='Left'></ToolbarItemDirective>
                        <ToolbarItemDirective name='Next' align='Left'></ToolbarItemDirective>
                        <ToolbarItemDirective name='DateRangeText' align='Left'></ToolbarItemDirective>
                        <ToolbarItemDirective name='Views' align='Right'></ToolbarItemDirective>
                    </ToolbarItemsDirective>
                </ScheduleComponent>
                <div className={`treeview-container ${isRtl ? 'e-rtl' : ''}`}>
                    <div className="title-text"><span>Available List</span></div>
                    <div className="role-tabs">
                        <ChipListComponent ref={chipsInstance} enableRtl={isRtl} id="chip-avatar" selection="Single" cssClass="e-outline" selectedChips={[0]} aria-labelledby="choiceChips" beforeClick={onBeforeClick} click={chipClick.bind(this)}>
                            <ChipsDirective>
                                <ChipDirective text="All" />
                                <ChipDirective text="Doctors" />
                                <ChipDirective text="Nurses" />
                                <ChipDirective text="Staffs" />
                            </ChipsDirective>
                        </ChipListComponent>
                    </div>
                    <TreeViewComponent ref={treeObj1} enableRtl={isRtl} id="treeview1" cssClass='treeview-external-drag' style={{ display: 'block' }} dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields1} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                    <TreeViewComponent ref={treeObj2} enableRtl={isRtl} id="treeview2" cssClass='treeview-external-drag' style={styleNone} dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields2} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                    <TreeViewComponent ref={treeObj3} enableRtl={isRtl} id="treeview3" cssClass='treeview-external-drag' style={styleNone} dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields3} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                    <TreeViewComponent ref={treeObj4} enableRtl={isRtl} id="treeview4" cssClass='treeview-external-drag' style={styleNone} dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields4} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                </div>
            </div>
            <div>
                <ToolbarComponent ref={toolbarRef} enableRtl={isRtl} cssClass={`agenda-toolbar ${scheduleObj.currentView !== "Agenda" ? 'e-hidden' : ''}`}>
                    <ItemsDirective>
                        <ItemDirective cssClass='tooltip-chips' type="Input" template={getChips} overflow="Show" align="Left" />
                        <ItemDirective cssClass='tooltip-ddl' type="Input" template={getDdl} overflow="Show" align="Right" />
                    </ItemsDirective>
                </ToolbarComponent>
            </div>
        </div>
        <div id="target" className="col-lg-8">
                <DialogComponent ref={dialogInstance} enableRtl={isRtl} id="modalDialog" cssClass='swap-dialog' height='240px' width='378px' isModal={true} buttons={buttons} header="Shift swap" target="#target" visible={status} open={dialogOpen} close={dialogClose} animationSettings={animationSettings}>
                    <div className='e-shift-swap'>
                        <div>
                            <label>Select an employee(Available for swapping)</label>
                            <DropDownListComponent
                                dataSource={employeeList}
                                fields={{ text: 'name', value: 'id' }}
                                change={dropDownListChange1}
                                placeholder="Select an employee"
                            />
                        </div>

                        <div style={{ marginTop: '10px' }}>
                            <label>Select shift</label>
                            <DropDownListComponent
                                dataSource={shiftList}
                                fields={{ text: 'name', value: 'id' }}
                                placeholder="Select shift"
                                change={dropDownListChange2}
                            />
                        </div>
                    </div>
                </DialogComponent>
            </div>
    </div>
    );
}

export default App;

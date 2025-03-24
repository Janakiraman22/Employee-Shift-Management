import './App.css';
import { useRef, useState } from 'react';
import { ScheduleComponent, TimelineViews, Inject, TimelineMonth, ResourceDirective, ResourcesDirective, ViewsDirective, ViewDirective, Resize, DragAndDrop, Agenda } from '@syncfusion/ej2-react-schedule';
import { closest, remove, addClass, Internationalization } from '@syncfusion/ej2-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import './Employee Shift Management/style.css';
import { ChipListComponent, ChipsDirective, ChipDirective } from '@syncfusion/ej2-react-buttons';
import salamanImage from './Avatar/salman@3x.png';
import rickyImage from './Avatar/ricky@3x.png';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-react-navigations';
import { L10n, setCurrencyCode } from '@syncfusion/ej2-base';
import { Locale } from './common/locale.ts';

// L10n.load({
//     "de": {
//         "schedule": {

//         }
//     },
//     "ar": {
//         "schedule": {

//         }
//     },
//     "en": {
//         "schedule": {
//             "Doctors": "Doctorsqqq"
//         }
//     },
//     "zh": {
//         "schedule": {
//             "Doctors": "醫生"
//         }
//     },
//     "fr-CH": {
//         "schedule": {
//             "Doctors": "hghgh"
//         }
//     }
// });

const selectedDate = new Date(2025, 2, 5);
const intl = new Internationalization();

let eventData = [
    { Id: 1, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 2, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 3, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T07:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 113, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-03T07:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 4, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 5, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 6, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 7, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 8, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 9, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 10, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 11, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 12, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },    
    { Id: 13, RoleId: 1, DesignationId: 1, EmployeeId: 1, Subject: "John", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 14, RoleId: 1, DesignationId: 1, EmployeeId: 2, Subject: "Nashil", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift)" },

    { Id: 15, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Michael", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 16, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 17, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Michael", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 18, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 19, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Michael", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 20, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 21, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Michael", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 22, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 23, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Michael", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 24, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 25, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Michael", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 26, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Available (Night Shift)" },    
    { Id: 27, RoleId: 1, DesignationId: 2, EmployeeId: 3, Subject: "Michael", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 28, RoleId: 1, DesignationId: 2, EmployeeId: 4, Subject: "William", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    
    { Id: 29, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 30, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Jennifer", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 31, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 32, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Jennifer", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 33, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 34, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Jennifer", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 35, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Full day Leave" },
    { Id: 36, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Jennifer", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 37, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 38, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Jennifer", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    { Id: 39, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 40, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Jennifer", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Available (Night Shift)" },    
    { Id: 41, RoleId: 1, DesignationId: 3, EmployeeId: 5, Subject: "David", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 42, RoleId: 1, DesignationId: 3, EmployeeId: 6, Subject: "Jennifer", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift)" },
    
    { Id: 43, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 44, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 45, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 46, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 47, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 48, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 49, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 50, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 51, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 52, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-06T19:30:00.000Z"), Description: "Half Day Leave" },
    { Id: 114, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-06T19:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 53, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 54, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Available (Night Shift)" },    
    { Id: 55, RoleId: 1, DesignationId: 4, EmployeeId: 7, Subject: "Thomas", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 56, RoleId: 1, DesignationId: 4, EmployeeId: 8, Subject: "Daniel", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },
    
    



    { Id: 57, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 58, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 59, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 60, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 61, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 62, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 63, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 64, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 65, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 66, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 67, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 68, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Available (Night Shift)" },    
    { Id: 69, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T07:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 115, RoleId: 2, DesignationId: 5, EmployeeId: 9, Subject: "Emma", StartTime: new Date("2025-03-08T07:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Half day Leave" },
    { Id: 70, RoleId: 2, DesignationId: 5, EmployeeId: 10, Subject: "Lily", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },

    { Id: 71, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 72, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 73, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 74, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 75, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 76, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 77, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 78, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 79, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 80, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 81, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 82, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Available (Night Shift)" },    
    { Id: 83, RoleId: 2, DesignationId: 6, EmployeeId: 11, Subject: "Ava", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 84, RoleId: 2, DesignationId: 6, EmployeeId: 12, Subject: "Grace", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift)" },





    { Id: 85, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 86, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 87, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 88, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 89, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 90, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 91, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 92, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 93, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 94, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 95, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 96, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Full Day Leave" },    
    { Id: 97, RoleId: 3, DesignationId: 7, EmployeeId: 13, Subject: "James", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 98, RoleId: 3, DesignationId: 7, EmployeeId: 14, Subject: "Benjamin", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift)" },

    { Id: 99, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-02T01:30:00.000Z"), EndTime: new Date("2025-03-02T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 100, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-02T13:30:00.000Z"), EndTime: new Date("2025-03-03T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 101, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 102, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 103, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), Description: "Available (Day Shift)", IsReadonly: true },
    { Id: 104, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), Description: "Available (Night Shift)", IsReadonly: true },
    { Id: 105, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 106, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 107, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 108, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), Description: "Available (Night Shift)" },
    { Id: 109, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), Description: "Available (Day Shift)" },
    { Id: 110, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), Description: "Available (Night Shift - Swap-Request)" },    
    { Id: 111, RoleId: 3, DesignationId: 8, EmployeeId: 15, Subject: "Olivia", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), Description: "Available (Day Shift - Swap-Request)" },
    { Id: 112, RoleId: 3, DesignationId: 8, EmployeeId: 16, Subject: "Chloe", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), Description: "Available (Night Shift)" },


    // { Id: 2, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: true },
    // { Id: 5, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: true },
    // { Id: 7, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-03T01:30:00.000Z"), EndTime: new Date("2025-03-03T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: true },
    // { Id: 9, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: true },
    // { Id: 10, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: true },
    // { Id: 11, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: true },
    // { Id: 12, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Full Day Leave", "Color": "#FFCDD2", IsReadonly: true },
    // { Id: 13, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: true },
    // { Id: 14, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: true },
    // { Id: 15, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-04T01:30:00.000Z"), EndTime: new Date("2025-03-04T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: true },
    // { Id: 16, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-03T13:30:00.000Z"), EndTime: new Date("2025-03-04T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: true },
    // { Id: 17, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 18, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 19, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: true },
    // { Id: 21, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: true },
    // { Id: 22, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T19:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift - Overtime)", IsReadonly: false },
    // { Id: 23, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: true },
    // { Id: 24, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-05T01:30:00.000Z"), EndTime: new Date("2025-03-05T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 25, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-04T13:30:00.000Z"), EndTime: new Date("2025-03-05T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: true },
    // { Id: 26, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 27, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 28, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift) Swap-Request", IsReadonly: false },
    // { Id: 29, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Full Day Leave (On-Call Duty)", IsReadonly: false },
    // { Id: 30, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 31, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-05T19:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Half-Day Leave (Night Shift)", IsReadonly: false },
    // { Id: 141, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-05T19:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 32, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-06T01:30:00.000Z"), EndTime: new Date("2025-03-06T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 33, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-05T13:30:00.000Z"), EndTime: new Date("2025-03-06T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", "Color": "#FFCDD2", IsReadonly: false },
    // { Id: 34, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 35, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty - Swap-Request)", IsReadonly: false },
    // { Id: 36, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 37, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 38, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 39, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 41, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-07T01:30:00.000Z"), EndTime: new Date("2025-03-07T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Full Day Leave", "Color": "#FFCDD2", IsReadonly: false },
    // { Id: 43, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-06T13:30:00.000Z"), EndTime: new Date("2025-03-07T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 44, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 45, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 46, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 48, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty - Swap-Request)", IsReadonly: false },
    // { Id: 49, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T07:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Half-Day Leave", "Color": "#FFECB3", IsReadonly: false },
    // { Id: 50, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-08T07:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 51, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", "Color": "#FFCDD2", IsReadonly: false },
    // { Id: 52, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-08T01:30:00.000Z"), EndTime: new Date("2025-03-08T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 53, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-07T13:30:00.000Z"), EndTime: new Date("2025-03-08T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift - Swap-Request)", IsReadonly: false },
    // { Id: 54, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-09T01:30:00.000Z"), EndTime: new Date("2025-03-09T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 56, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-09T01:30:00.000Z"), EndTime: new Date("2025-03-09T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 57, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift - Swap-Request)", IsReadonly: false },
    // { Id: 58, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 59, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-09T01:30:00.000Z"), EndTime: new Date("2025-03-09T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 60, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 61, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-09T01:30:00.000Z"), EndTime: new Date("2025-03-09T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 63, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-08T13:30:00.000Z"), EndTime: new Date("2025-03-09T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 64, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-10T01:30:00.000Z"), EndTime: new Date("2025-03-10T19:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift - Overtime)", IsReadonly: false },
    // { Id: 65, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-10T01:30:00.000Z"), EndTime: new Date("2025-03-10T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty - Swap-Request)", IsReadonly: false },
    // { Id: 66, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-09T13:30:00.000Z"), EndTime: new Date("2025-03-10T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 68, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-09T13:30:00.000Z"), EndTime: new Date("2025-03-10T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 69, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-10T01:30:00.000Z"), EndTime: new Date("2025-03-10T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 70, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-09T13:30:00.000Z"), EndTime: new Date("2025-03-10T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 71, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-10T01:30:00.000Z"), EndTime: new Date("2025-03-10T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 73, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-09T13:30:00.000Z"), EndTime: new Date("2025-03-10T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 75, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-11T01:30:00.000Z"), EndTime: new Date("2025-03-11T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 77, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-11T01:30:00.000Z"), EndTime: new Date("2025-03-11T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 79, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-10T13:30:00.000Z"), EndTime: new Date("2025-03-11T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 80, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-10T13:30:00.000Z"), EndTime: new Date("2025-03-11T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty - Swap-Request)", IsReadonly: false },
    // { Id: 81, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-11T01:30:00.000Z"), EndTime: new Date("2025-03-11T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 82, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-10T13:30:00.000Z"), EndTime: new Date("2025-03-11T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift - Swap-Request)", IsReadonly: false },
    // { Id: 83, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-11T01:30:00.000Z"), EndTime: new Date("2025-03-11T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 85, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-10T13:30:00.000Z"), EndTime: new Date("2025-03-11T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 87, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-12T01:30:00.000Z"), EndTime: new Date("2025-03-12T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 89, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-12T01:30:00.000Z"), EndTime: new Date("2025-03-12T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 90, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-11T13:30:00.000Z"), EndTime: new Date("2025-03-12T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 92, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-11T13:30:00.000Z"), EndTime: new Date("2025-03-12T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 93, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-12T01:30:00.000Z"), EndTime: new Date("2025-03-12T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 94, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-11T13:30:00.000Z"), EndTime: new Date("2025-03-12T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 96, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-12T01:30:00.000Z"), EndTime: new Date("2025-03-12T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 97, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-11T13:30:00.000Z"), EndTime: new Date("2025-03-12T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift - Swap-Request)", IsReadonly: false },
    // { Id: 98, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-13T01:30:00.000Z"), EndTime: new Date("2025-03-13T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 99, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-13T01:30:00.000Z"), EndTime: new Date("2025-03-13T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 100, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-12T13:30:00.000Z"), EndTime: new Date("2025-03-13T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift - Swap-Request)", IsReadonly: false },
    // { Id: 101, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-12T13:30:00.000Z"), EndTime: new Date("2025-03-13T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 102, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-13T01:30:00.000Z"), EndTime: new Date("2025-03-13T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 103, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-12T13:30:00.000Z"), EndTime: new Date("2025-03-13T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 104, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-13T01:30:00.000Z"), EndTime: new Date("2025-03-13T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 105, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-12T13:30:00.000Z"), EndTime: new Date("2025-03-13T07:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift - Overtime)", IsReadonly: false },
    // { Id: 106, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-14T01:30:00.000Z"), EndTime: new Date("2025-03-14T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 107, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-14T01:30:00.000Z"), EndTime: new Date("2025-03-14T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 108, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-13T13:30:00.000Z"), EndTime: new Date("2025-03-14T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 111, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-13T13:30:00.000Z"), EndTime: new Date("2025-03-14T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 112, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-14T01:30:00.000Z"), EndTime: new Date("2025-03-14T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 113, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-13T13:30:00.000Z"), EndTime: new Date("2025-03-14T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 114, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-14T01:30:00.000Z"), EndTime: new Date("2025-03-14T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 115, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-13T13:30:00.000Z"), EndTime: new Date("2025-03-14T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 116, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-15T01:30:00.000Z"), EndTime: new Date("2025-03-15T07:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 117, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-15T07:30:00.000Z"), EndTime: new Date("2025-03-15T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Half-Day Leave", IsReadonly: false },
    // { Id: 118, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-15T01:30:00.000Z"), EndTime: new Date("2025-03-15T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 120, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-14T13:30:00.000Z"), EndTime: new Date("2025-03-15T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 121, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-14T13:30:00.000Z"), EndTime: new Date("2025-03-15T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 124, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-15T01:30:00.000Z"), EndTime: new Date("2025-03-15T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift - Swap-Request)", IsReadonly: false },
    // { Id: 125, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-14T13:30:00.000Z"), EndTime: new Date("2025-03-15T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 126, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-15T01:30:00.000Z"), EndTime: new Date("2025-03-15T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 128, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-14T13:30:00.000Z"), EndTime: new Date("2025-03-15T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 130, Subject: "Robert", Designation: "General Practitioner", StartTime: new Date("2025-03-16T01:30:00.000Z"), EndTime: new Date("2025-03-16T13:30:00.000Z"), RoleId: 1, EmployeeId: 1, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 131, Subject: "Smith", Designation: "Neurologist", StartTime: new Date("2025-03-16T01:30:00.000Z"), EndTime: new Date("2025-03-16T13:30:00.000Z"), RoleId: 1, EmployeeId: 3, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 132, Subject: "Nancy", Designation: "Cardiologist", StartTime: new Date("2025-03-15T13:30:00.000Z"), EndTime: new Date("2025-03-16T01:30:00.000Z"), RoleId: 1, EmployeeId: 2, Description: "Available (Night Shift - Swap-Request)", IsReadonly: false },
    // { Id: 134, Subject: "Williams", Designation: "General Practitioner", StartTime: new Date("2025-03-15T13:30:00.000Z"), EndTime: new Date("2025-03-16T01:30:00.000Z"), RoleId: 1, EmployeeId: 4, Description: "Available (On-Call Duty)", IsReadonly: false },
    // { Id: 136, Subject: "Laura", Designation: "Staff Nurse", StartTime: new Date("2025-03-16T01:30:00.000Z"), EndTime: new Date("2025-03-16T13:30:00.000Z"), RoleId: 2, EmployeeId: 5, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 137, Subject: "Margaret", Designation: "Head Nurse", StartTime: new Date("2025-03-15T13:30:00.000Z"), EndTime: new Date("2025-03-16T01:30:00.000Z"), RoleId: 2, EmployeeId: 6, Description: "Available (Night Shift)", IsReadonly: false },
    // { Id: 138, Subject: "Alice", Designation: "Ward Assistant", StartTime: new Date("2025-03-16T01:30:00.000Z"), EndTime: new Date("2025-03-16T13:30:00.000Z"), RoleId: 3, EmployeeId: 7, Description: "Available (Day Shift)", IsReadonly: false },
    // { Id: 140, Subject: "Robson", Designation: "Hospital Attendant", StartTime: new Date("2025-03-15T13:30:00.000Z"), EndTime: new Date("2025-03-16T01:30:00.000Z"), RoleId: 3, EmployeeId: 8, Description: "Available (Night Shift)", IsReadonly: false }
];

const employeeRole = [
    { role: 'Doctors', id: 1, color: '#0875B8' },
    { role: 'Nurses', id: 2, color: '#633DD0' },
    { role: 'Support Staffs', id: 3, color: '#017A34' }
];

const designationsData = [
    { name: 'Attending Physician', id: 1, groupId: 1, color: '#ADD8E6' },
    { name: 'Hospitalist', id: 2, groupId: 1, color: '#6A0DAD' },
    { name: 'General Pediatrician', id: 3, groupId: 1, color: '#7fa900' },
    { name: 'Resident Doctor', id: 4, groupId: 1, color: '#7fa900' },
    { name: 'Senior Nurse', id: 5, groupId: 2, color: '#ea7a57' },
    { name: 'Nurse Practitioner', id: 6, groupId: 2, color: '#5978ee' },
    { name: 'Medical Assistant', id: 7, groupId: 3, color: '#df5286' },
    { name: 'Receptionist', id: 8, groupId: 3, color: '#00bdae' }
];

const group = {
    resources: ['Roles', 'Designations']
};

const majorSlotTemplate = (props) => {
    return (<div>{intl.formatDate(props.date, { skeleton: 'hm' }) === '12:00 AM' ? 'Day Shift' : 'Night Shift'}</div>);
  }

const timeScale = {
    enable: true,
    interval: 720,
    slotCount: 4,
    majorSlotTemplate: majorSlotTemplate.bind(this),
};

const workHours = { start: '00:00', end: '23:59' };

function App() {
    const scheduleObj = useRef(null);
    const dialogInstance = useRef(null);

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
                dialogInstance.current.hide();
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
                reqEvent[0].Subject = 'Shift swapped between Dr.' + reqShift.name + ' and ' + selectedEmployee.name;
                reqEvent[0].Description = reqEvent[0].Description.replace(' - Swap-Request', '').replace('Swap-Request', '');
                dataSource[reqEventIndex] = reqEvent[0];


                let accEventIndex;
                let accShiftIds = selectedShift.eventId;
                let accEvent = dataSource.filter((item, index) => {
                    if (item.Id === accShiftIds) {
                        accEventIndex = index;
                        return true;
                    }
                    return false;
                });
                accEvent[0].Subject = 'Shift swapped between Dr.' + selectedEmployee.name + ' and ' + reqShift.name;
                accEvent[0].Description = accEvent[0].Description.replace(' - Swap-Request', '').replace('Swap-Request', '');
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
        return intl.formatDate(value, { type: 'time', skeleton: 'short' });
    }

    const getDate = (value) => {
        return parseInt(intl.formatDate(value, { skeleton: 'd' }), 10);
    }

    // const getTime = () => {
    //     return intl.formatDate(value, { skeleton: 'H' });
    // }


    const [shiftsData, setShiftsData] = useState([]);

    // Function to Handle Shift Swap Request
    function requestShiftSwap(args) {
        const eventsData = scheduleObj.current.eventSettings.dataSource;
        const eventDetails = scheduleObj.current.getEventDetails(closest(args.target, '.e-appointment'));
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
        if (isOvertime) {
            isDefaultEventEle = false;
            let isDayView = scheduleObj.current.currentView === 'TimelineDay';
            let isDayShift = props.Description.toLowerCase().includes('day');

            let eventEleWidth = parseFloat(element.style.width, 10) + 4;

            var startTime = props.StartTime;
            var endTime = props.EndTime;

            // Get time difference in milliseconds
            var timeDifference = endTime.getTime() - startTime.getTime();
            var differenceInHours = timeDifference / (1000 * 60 * 60);


            // Get midnight of the next day
            var midnight = new Date(startTime);
            midnight.setHours(24, 0, 0, 0); // Midnight of next day

            var hoursOnStartDay, hoursOnNextDay;

            if (endTime <= midnight) {
                // Case 1: End time is still on the same day
                hoursOnStartDay = differenceInHours;
                hoursOnNextDay = 0;
            } else {
                // Case 2: End time goes to the next day
                hoursOnStartDay = (midnight.getTime() - startTime.getTime()) / (1000 * 60 * 60);
                hoursOnNextDay = (endTime.getTime() - midnight.getTime()) / (1000 * 60 * 60);
            }
            var isOnlyOvertime = false;
            var currentHours = differenceInHours;

            if (isDayView) {
                currentHours = isDayShift ? (differenceInHours - hoursOnNextDay) :  (differenceInHours - hoursOnStartDay);

                let eventEleDate = getDate(scheduleObj.current.selectedDate);
                let eventModelDate = props.StartTime.getDate();
                if (isDayShift){
                    if (eventEleDate !== eventModelDate) {
                        isOnlyOvertime = true;
                    }
                } else {
                    if (eventEleDate === eventModelDate) {
                        isDefaultEventEle = true;
                    }

                }

            }
            if (!isDefaultEventEle) {

            var eleWidthPerHour = eventEleWidth / currentHours;

            var dayShift = 12;
            var nighShift = isDayView ? 7 : 12;
            var overShift = (isDayShift ? currentHours - dayShift : currentHours - nighShift);
            var nrmlShift = isDayShift ? dayShift : nighShift;
            var eventsContIconEleSize = 17;

            var nrmlShiftTime = Math.round(( nrmlShift * eleWidthPerHour));
            var overShiftTime = Math.round((overShift * eleWidthPerHour)) + (isDayShift ? 0 :( isDayView ? eventsContIconEleSize : 0) );

            if (isOnlyOvertime) {
                element.classList.add('ot-conts');
                const templateWrap = document.createElement('div');
                templateWrap.className = 'template-wrap';

                // Create the staff container div
                const staffWrap = document.createElement('div');
                staffWrap.className = 'e-staff';

                // Create the staff info div
                const staffInfo = document.createElement('div');
                staffInfo.className = 'staff-info';

                // Create and append the staff name
                const name = document.createElement('div');
                name.className = 'e-name';
                name.innerHTML = 'Overtime Shift';

                // Create and append the staff designation
                const designation = document.createElement('div');
                designation.className = 'e-designation';
                designation.textContent = props.Subject

                // Append name and designation to staffInfo
                staffInfo.appendChild(name);
                staffInfo.appendChild(designation);

                // Append staffImage and staffInfo to staffWrap
                staffWrap.appendChild(staffInfo);

                // Create the time display div
                const timeDiv = document.createElement('div');
                timeDiv.className = 'e-time';
                timeDiv.textContent = `Shift Time: ${getTimeString(props.StartTime)} - ${getTimeString(props.EndTime)}`;

                // Append staffWrap and timeDiv to templateWrap
                templateWrap.appendChild(staffWrap);
                templateWrap.appendChild(timeDiv);

                // Return the full element
                return templateWrap;

            }


            console.log(scheduleObj.current.selectedDate);
            // Create the main wrapper div
            const templateWrap = document.createElement('div');
            templateWrap.className = 'template-wrap overtime';

            const shiftEle = document.createElement('span');
            shiftEle.className = 'shift-part';
            shiftEle.style.width = nrmlShiftTime + 'px';

            const overtimeEle = document.createElement('span');
            overtimeEle.className = 'overtime-part';
            overtimeEle.style.width = overShiftTime + 'px';

            for (let idx = 0; idx < 2; idx++) {
                // Create the staff container div
                const staffWrap = document.createElement('div');
                staffWrap.className = 'e-staff';

                if (idx === 0) {
                    // Create the staff image div
                    const staffImage = document.createElement('div');
                    staffImage.className = 'staff-image';
                    staffImage.textContent = props.Subject.charAt(0);
                    staffWrap.appendChild(staffImage);

                }

                // Create the staff info div
                const staffInfo = document.createElement('div');
                staffInfo.className = 'staff-info';

                // Create and append the staff name
                const name = document.createElement('div');
                name.className = 'e-name';
                name.innerHTML = idx === 1 ? 'Overtime Shift' : props.Subject;

                // Create and append the staff designation
                const designation = document.createElement('div');
                designation.className = 'e-designation';
                designation.textContent = idx === 1 ? props.Subject : props.Designation;

                // Append name and designation to staffInfo
                staffInfo.appendChild(name);
                staffInfo.appendChild(designation);

                // Append staffImage and staffInfo to staffWrap

                staffWrap.appendChild(staffInfo);

                // Create the time display div
                const timeDiv = document.createElement('div');
                timeDiv.className = 'e-time';
                timeDiv.textContent = `Shift Time: ${getTimeString(props.StartTime)} - ${getTimeString(props.EndTime)}`;

                if (idx === 0) {
                    shiftEle.appendChild(staffWrap);
                    shiftEle.appendChild(timeDiv);
                } else {
                    overtimeEle.appendChild(staffWrap);
                    overtimeEle.appendChild(timeDiv);
                }
                // Append staffWrap and timeDiv to templateWrap


            }
            templateWrap.appendChild(shiftEle);
            templateWrap.appendChild(overtimeEle);



            // Return the full element
            return templateWrap;
        }

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
            staffImage.src = 'https://ej2.syncfusion.com/react/demos/src/schedule/images/robert.png';

            // Create the staff info div
            const staffInfo = document.createElement('div');
            staffInfo.className = 'staff-info';

            // Create and append the staff name
            const name = document.createElement('div');
            name.className = 'e-name';
            name.innerHTML = props.Description.toLowerCase().includes('leave') && !props.Subject.toLowerCase().includes('covers') ? props.Description : props.Subject;

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

    const onEventRendered = (args) => {
        let startTime = getTimeString(args.data.StartTime);
        if (startTime === '7:00 AM' || startTime === '1:00 PM') {
            args.element.classList.add(args.data.Description.includes('On-Call Duty') ? 'on-call-shift' : 'day-shift');
        } else {
            args.element.classList.add(args.data.Description.includes('On-Call Duty') ? 'on-call-shift' : 'night-shift');
        }
        const innerWrap = args.element.querySelector('.e-inner-wrap');
        if (innerWrap) {
            innerWrap.innerHTML = '';

            if (args.data.Description.toLowerCase().includes('overtime')) {
                args.element.classList.add('e-overtime');
                const elementToAppend = getEventElement(args.data, args.element, true);
                innerWrap.appendChild(elementToAppend);
            } else {
                const elementToAppend = getEventElement(args.data, args.element);
                innerWrap.appendChild(elementToAppend);
            }

            if (!args.element.classList.contains('e-read-only')) {
                let groupIndex = args.element.getAttribute('data-group-index');
                args.element.classList.add(groupIndex === '0' ? 'doctors-event' : (groupIndex === '1' ? 'nurses-event' : 'staffs-event'));
            }
        }

        if (args.data.Description.toLowerCase().includes('leave')) {
            args.element.classList.add('event-leave');

            let iconElement = document.createElement('span');
            iconElement.classList.add('e-leave');
            iconElement.classList.add('e-icons');

            args.element.appendChild(iconElement);
        }
        if (args.data.Subject.includes('covers for')) {
            args.element.classList.add('e-covers');
            if (args.element.classList.contains('event-leave')) {
                args.element.classList.remove('event-leave');
            }

            const leaveElement = args.element.querySelector('.e-leave');
            if (leaveElement) {
                // Add classes to the element
                leaveElement.classList.add('e-replaced', 'sf-icon-user-replace');
                // Remove the 'e-leave' class
                leaveElement.classList.remove('e-leave');
            }
        }
        if (args.data.Description.toLowerCase().includes('swap-request') && !args.data.Subject.toLowerCase().includes('swapped') && scheduleObj.current.currentView !== 'Agenda') {
            args.element.classList.add('event-swap');
            let iconElement = document.createElement('span');
            iconElement.classList.add('e-swap');
            iconElement.classList.add('e-icons');
            iconElement.classList.add('sf-icon-replace-request');

            iconElement.addEventListener('click', (args) => {
                if (args.target.classList.contains('sf-icon-replace-request')) {
                    requestShiftSwap(args);
                }
            });

            args.element.appendChild(iconElement);
        }
        if (args.data.Subject.toLowerCase().includes('swapped')) {
            if (args.element.classList.contains('event-swap')) {
                args.element.classList.remove('event-swap');
            }
            args.element.classList.add('event-swapped');

            let iconElement = document.createElement('span');
            iconElement.classList.add('e-swapped');
            iconElement.classList.add('e-icons');
            iconElement.classList.add('sf-icon-replace-accepted');
            args.element.appendChild(iconElement);

            // const leaveElement = args.element.querySelector('.e-swap');
            // if (leaveElement) {
            //     // Add classes to the element
            //     leaveElement.classList.add('e-swapped', '');
            //     // Remove the 'e-leave' class
            //     leaveElement.classList.remove('e-swap', 'sf-icon-replace-request');
            // }
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
        brian: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/laura.png',
        kevin: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/alice.png',
        salman: salamanImage,
        olivia: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/margaret.png',
        zoe: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/nancy.png',
        ricky: rickyImage,
        jake: 'https://ej2.syncfusion.com/react/demos/src/schedule/images/robson.png',
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
                        eventDetails.Subject = 'Dr.' + filteredData[0].Name + ' covers for Dr.' + eventDetails.Subject;
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

    // let [filteredQuery, setFilteredQuery] = useState(new Query());
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

        // let query = new Query();
        // let filter = employeeName

        // query = query.where('Subject', 'contains', filter, true);
        // setFilteredQuery(query);

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

        // let selectedEmpData = employeeRole.find(item => item.role.indexOf(args.data.text) !== -1);

        // let query = new Query();
        // let filter = selectedEmpData ? selectedEmpData.id : '';

        // query = query.where('RoleId', 'contains', filter, true);
        // setFilteredQuery(query);

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
                    // startHour="07:00"
                    // endHour='30:59'
                    group={group}
                    eventSettings={{ dataSource: eventData, enableMaxHeight: true, }}
                    timeScale={timeScale}
                    workHours={workHours}
                    showTimeIndicator={true}
                    eventRendered={onEventRendered}
                  //  resourceHeaderTemplate={resourceHeaderTemplate}
                    resizeStart={resizeStart}
                    resizing={resizing}
                    resizeStop={resizeStop}
                    actionBegin={onActionBegin}
                    navigating={onNavigating}
                    dataBound={onDataBound}
                    editorHeaderTemplate={editorHeaderTemplate}
                >

                    <ViewsDirective>
                        <ViewDirective option='TimelineDay' />
                        <ViewDirective option="TimelineWeek" />
                        <ViewDirective option='TimelineMonth' readonly={true} />
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
                    <Inject services={[TimelineViews, TimelineMonth, Agenda, Resize, DragAndDrop]} />
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
            <div>
                <ToolbarComponent ref={toolbarRef} enableRtl={isRtl} cssClass={`agenda-toolbar ${scheduleObj.currentView !== "Agenda" ? 'e-hidden' : ''}`}>
                    <ItemsDirective>
                        <ItemDirective cssClass='tooltip-chips' type="Input" template={getChips} overflow="Show" align="Left" />
                        <ItemDirective cssClass='tooltip-ddl' type="Input" template={getDdl} overflow="Show" align="Right" />
                    </ItemsDirective>
                </ToolbarComponent>
            </div>

        </div>
    </div>
    );
}

export default App;

import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import '../models/currentUser';
import Navbar from './shared/navbar';

import Projects from './time_table/projects/projects';
import ProjectsList from './time_table/projects/projects_list';
import ProjectWorkTimes from './time_table/projects/project_work_times';
import EditProject from './time_table/projects/edit_project';
import ExternalAuth from './time_table/projects/external_auth';
import Users from './time_table/users/users';
import EditUser from './time_table/users/edit_user';
import ByProjects from './time_table/reports/by_projects';
import ByUsers from './time_table/reports/by_users';
import Periods from './time_table/accounting_periods/periods';
import EditPeriod from './time_table/accounting_periods/edit_period';
import Timesheet from './time_table/timesheet/timesheet';
import NewReport from './time_table/project_reports/new_report';
import EditReport from './time_table/project_reports/edit_report';
import ProjectReports from './time_table/project_reports/project_reports';
import Vacations from './time_table/vacations/vacations';
import Staff from './time_table/staff/staff';
import VacationPeriods from './time_table/vacation_periods/vacation_periods';
import EditVacationPeriod from './time_table/vacation_periods/edit_vacation_period';
import HardwareList from './time_table/hardware/hardware_list';

class TimeTable extends React.Component {
  constructor(props) {
    super(props);

    I18n.locale = currentUser.lang;
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app container">
          { window.location.pathname === '/' ? <Redirect to="/timesheet" /> : null }
          <Navbar />
          <div className="content">
            <Route path="/users" exact component={Users} />
            <Route path="/users/edit/:id" component={EditUser} />
            <Route path="/users/new" exact component={EditUser} />
            <Route path="/staff" exact component={Staff} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/projects/list" exact component={ProjectsList} />
            <Route path="/projects/:id/work_times" component={ProjectWorkTimes} />
            <Route path="/projects/:id/edit" component={EditProject} />
            <Route path="/projects/:id/external_authorization" component={ExternalAuth} />
            <Route path="/projects/:projectId/reports" component={ProjectReports} />
            <Route path="/projects/:projectId/new_report" component={NewReport} />
            <Route path="/projects/:projectId/edit_report/:reportId" component={EditReport} />
            <Route path="/projects/new" component={EditProject} />
            <Route path="/reports/work_times/by_projects" component={ByProjects} />
            <Route path="/reports/work_times/by_users" component={ByUsers} />
            <Route path="/accounting_periods" exact component={Periods} />
            <Route path="/accounting_periods/edit/:id" component={EditPeriod} />
            <Route path="/accounting_periods/new" component={EditPeriod} />
            <Route path="/vacation_periods" exact component={VacationPeriods} />
            <Route path="/vacation_periods/edit/:id" component={EditVacationPeriod} />
            <Route path="/timesheet" component={Timesheet} />
            <Route path="/vacations" component={Vacations} />
            <Route path="/hardware" component={HardwareList} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default TimeTable;

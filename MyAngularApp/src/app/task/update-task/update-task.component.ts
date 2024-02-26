import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

import { TaskService } from "src/app/shared/task.service";

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss']
})
export class UpdateTaskComponent implements OnInit {

  constructor(private taskService: TaskService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router
  ) { }

   
  id ;
  currentTask ;
  mcurrentTaskStatus
  mcurrentTaskDeadline ;
  mcurrentTaskTaskname ;
  submitted: boolean;
  showSuccessMessage: boolean;
  showFailMessage: boolean;
  statusTypes: any ;
  stringifyResult: any;
  // stringifyResult1: any;
  jsonResult: any ;


  updateTaskForm = this.formBuilder.group({
    task: new FormControl(''),
    statusId: new FormControl(''),
    deadline: new FormControl('')
  }) ;

  //for date picker configuration/modification
  datePickerConfig: Partial<BsDatepickerConfig>;

  //for date picker configuration/modification
  datepicker(){
    this.datePickerConfig = Object.assign({}, 
      {
        containerClass: 'theme-default',    //'theme-blue', 'theme-green', theme-red
        showWeekNumbers: false,
        dateInputFormat: 'YYYY-MM-DD',
        // bsValue: this.mcurrentTaskDeadline
        /*
        1- below line of code is for setting minimum Date 
        2- (with "minDate:new Date()" user will be able to select only future dates from present day
        and will not be able to select the past date, CAN ACT AS AN DATE VALIDATION)
        3- and "maxDate:new Date()" will do opposite of point-2 (this is mostly used in a Date of Birth validation).
        */ 
        // minDate: new Date()
        // maxDate: new Date(2099, 0, 1)   ---> //for 1st January 2099
      });
  }

  getStatusTypes(){
    this.taskService.getStatusTypes().subscribe( (result) => {
      this.statusTypes = result ;
    } )
  }

  ngOnInit(): void {

    //getting id
    this.id = this.route.snapshot.params.id

    this.taskService.getCurrentTask(this.id).subscribe( (result) => {
      this.currentTask = result ;

      this.stringifyResult = JSON.stringify(result)
      this.jsonResult = JSON.parse(this.stringifyResult);
      // this.stringifyResult1 = JSON.stringify(this.stringifyResult)

      // this.stringifyResult = JSON.parse(result)
      // this.jsonResult = JSON.parse(this.stringifyResult)
      // this.jsonResult = JSON.parse(result)
      console.log("logging result..: "+ this.stringifyResult);   //.tasks.statusId
      console.log("logging result_task..: "+ this.jsonResult["tasks"].task);
      console.log("logging result_status..: "+ this.jsonResult["tasks"].statusId_id);
      console.log("logging result_deadline..: "+ this.jsonResult["tasks"].deadline_date);
      // console.log("logging result..: "+ this.stringifyStatus.statusId);
      

      console.warn(this.currentTask.tasks);
      
      //here accessing tasks array by using ".task" at the end.
      this.mcurrentTaskTaskname = this.jsonResult["tasks"].task 
      this.mcurrentTaskStatus = this.jsonResult["tasks"].statusId_id
      this.mcurrentTaskDeadline = this.jsonResult["tasks"].deadline_date
      
      //this will give us prefilled values for Task that we want to update
      this.updateTaskForm.controls['task'].setValue(this.mcurrentTaskTaskname);
      this.updateTaskForm.controls['statusId'].setValue(this.mcurrentTaskStatus);
      this.updateTaskForm.controls['deadline'].setValue(new Date(this.mcurrentTaskDeadline));
      
      

      // this.updateTaskForm = this.formBuilder.group({
      //   task: new FormControl(this.mcurrentTask['task']),
      //   statusId: new FormControl(),  //this.mcurrentTask['statusId']
      //   deadline: new FormControl()   //this.mcurrentTask['deadline_date']
      // }) ;

      // calling this.datepicker() method to apply datepicker modification/config
      this.datepicker();

      //calling this to get all the StatusTypes.
      this.getStatusTypes();
    } )    

  }

  // convenience getter for easy access to form fields
  get ut() { return this.updateTaskForm.controls; }

  resetUpdateForm(){
    this.updateTaskForm.reset() ;
  }

  updateData(){

    this.submitted = true ;

    if(this.updateTaskForm.valid){
      this.taskService.updateTask(this.id, this.updateTaskForm.value).subscribe( 
        (result) => {
  
        //this will show success message and automatically vanish after 4 seconds.   
        this.showSuccessMessage = true
        setTimeout( () => { this.showSuccessMessage = false }, 4000)
        
        //this will reset form
        this.resetUpdateForm() ;
        this.submitted = false ;
  
        }, 
        (error) => {

          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.router.navigate(['/login'])
            }
            if (error.status === 500) {
              this.router.navigate(['/login'])
            }
          }

          this.showFailMessage = true ;
          setTimeout(() => this.showFailMessage = false, 4000);
          console.log(error);
        }
      )
    }
    else{
      console.warn('Form is invalid');
      return
    }
  }

}

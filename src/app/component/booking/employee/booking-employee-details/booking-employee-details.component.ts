import { Component, Input } from '@angular/core';
import { VehicleBooking } from '../../../../models/vehicle-booking.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingEmployeeService } from '../../../../service/booking/employee/booking-employee.service';

@Component({
  selector: 'app-booking-employee-details',
  standalone: true,
  imports: [],
  templateUrl: './booking-employee-details.component.html',
  styleUrl: './booking-employee-details.component.css'
})
export class BookingEmployeeDetailsComponent {
  @Input() booking!: VehicleBooking;

  constructor(private router: Router, private route: ActivatedRoute, private bookingEmployeeService: BookingEmployeeService  ){

  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getBookingById(id);
  }
  getBookingById(id: number): void{
    this.bookingEmployeeService.getBookingById(id).subscribe({
      next:(booking:VehicleBooking) => {
        this.booking = booking;
        console.log("booking: ",booking);
      },
      error:(err: any)=> {
        console.error("erreur lors de la récupération",err)
      }
    })
  }
}

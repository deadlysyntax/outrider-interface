import { Component, Input } from '@angular/core'


@Component({
  selector:    'opportunity-data',
  templateUrl: 'opportunityData.html'
})
export default class OpportunityData {

  @Input()
  opportunity: any;


}

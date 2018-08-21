import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AgileTeamComponent } from './agile-team.component'

describe('AgileTeamComponent', () => {
  let component: AgileTeamComponent
  let fixture: ComponentFixture<AgileTeamComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgileTeamComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AgileTeamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

import { AgileSystem } from '../entities/agile_system'
// import { AgileSprint } from '../entities/agile_sprint'
// import { AgileStory } from '../entities/agile_story'
// import { AgileSystemUser } from '../entities/agile_system_user'
// import { WorkTeamMember } from '../entities/work_team_member'
// import { WorkTeam } from '../entities/work_team'
import { getManager } from 'typeorm'

export class Repository {
  static getAllAgileSystems () {
    return getManager()
      .getRepository(AgileSystem)
      .find({ relations: ['work_team'] })
  }
}

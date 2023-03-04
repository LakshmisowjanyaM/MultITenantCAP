using {weighbridge as db} from '../db/data-model';


service WeightService @(path : '/WeightService') @(requires : 'authenticated-user') {

    entity GTWeightDetails      as projection on db.weightDetails;
    entity offSyncWeightDetails  as projection on db.syncWeightDetails;
}

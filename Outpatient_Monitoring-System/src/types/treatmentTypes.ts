export type Treatment = {
    appointment : string,
    bloodPressure : number,
    glucoseLevel : number,
    heartRate : number,
    weight: number,
    height: number,
    bodyTemperature : number,
    status? : boolean,
    patientId? : number
}
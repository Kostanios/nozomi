import { AxiosError } from 'axios';

export interface Medication {
    id: string
    name: string
    user_id: string
    description: string
    count: number
    destination_count: number
}

export interface InitialMedicationState {
    medications: Medication[],
    loading: {
        getMedications: boolean
        createMedication: boolean
        updateMedication: boolean
        deleteMedication: boolean
    },
    error: {
        getMedications: AxiosError<Error> | null
        createMedication: AxiosError<Error> | null
        updateMedication: AxiosError<Error> | null
        deleteMedication: AxiosError<Error> | null
    }
}

export interface MedicationState extends InitialMedicationState {
    deleteMedication: (id: string) => Promise<void>
    updateMedication: (id: string, data: { count?: number, destination_count?: number }) => Promise<void>
    getMedications: () => Promise<void>
    createMedication: (data: { name: string, description?: string, count: number, destination_count?: number }, onSuccess?: () => void) => Promise<void>
}

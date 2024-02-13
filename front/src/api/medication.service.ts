import axiosInstance from "../config/axiosConfig";
import { Medication } from "../model/medication.model";

export const MedicationService = {
    createMedication: (data: { name: string, description?: string, count: number, destination_count?: number }) => axiosInstance.post<Medication>('/api/medications', data),
    getMedications: () => axiosInstance.get<{ medications: Medication[] }>('/api/medications'),
    deleteMedication: (id: string) => axiosInstance.delete(`/api/medications/${id}`),
    updateMedication: (id: string, data: { count?: number, count_destination?: number}) => axiosInstance.patch(`api/medications/${id}`, data)
};
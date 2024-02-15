import { AxiosError } from 'axios';
import { create } from 'zustand';

import { InitialMedicationState, MedicationState } from '../model/medication.model';
import { MedicationService } from '../api/medication.service';

const initialState: InitialMedicationState = {
    medications: [],
    loading: {
        updateMedication: false,
        getMedications: false,
        createMedication: false,
        deleteMedication: false
    },
    error: {
        updateMedication: null,
        createMedication: null,
        getMedications: null,
        deleteMedication: null
    },
};

export const medicationStore = create<MedicationState>((set, get) => ({
    createMedication: async (data, onSuccess) => {
        try {
            set({
                loading: {
                    ...get().loading,
                    createMedication: true
                }
            });

            await MedicationService.createMedication(data);

            await get().getMedications();

            set({
                loading: {
                    ...get().loading,
                    createMedication: false,
                },
                error: {
                    ...get().error,
                    createMedication: null
                }
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            const error = err as AxiosError<Error>;
            console.error(error);
            set({
                loading: {
                    ...get().loading,
                    createMedication: false,
                },
                error: {
                    ...get().error,
                    createMedication: error
                }
            });
        }
    },
    deleteMedication: async id => {
        try {
            set({
                loading: {
                    ...get().loading,
                    deleteMedication: true
                }
            });

            await MedicationService.deleteMedication(id);

            await get().getMedications();

            set({
                loading: {
                    ...get().loading,
                    deleteMedication: false,
                },
                error: {
                    ...get().error,
                    deleteMedication: null
                }
            });
        } catch (err) {
            const error = err as AxiosError<Error>;
            console.error(error);
            set({
                loading: {
                    ...get().loading,
                    deleteMedication: false,
                },
                error: {
                    ...get().error,
                    deleteMedication: error
                }
            });
        }
    },
    updateMedication: async (id, data) => {
        try {
            set({
                loading: {
                    ...get().loading,
                    updateMedication: true
                }
            });

            await MedicationService.updateMedication(id, data);

            await get().getMedications();

            set({
                loading: {
                    ...get().loading,
                    updateMedication: false,
                },
                error: {
                    ...get().error,
                    updateMedication: null
                }
            });
        } catch (err) {
            const error = err as AxiosError<Error>;
            console.error(error);
            set({
                loading: {
                    ...get().loading,
                    updateMedication: false,
                },
                error: {
                    ...get().error,
                    updateMedication: error
                }
            });
        }
    },
    getMedications: async () => {
        try {
            set({
                loading: {
                    ...get().loading,
                    getMedications: true
                }
            });

            const medicationsRes = await MedicationService.getMedications();

            set({
                medications: medicationsRes.data.medications,
                loading: {
                    ...get().loading,
                    getMedications: false,
                },
                error: {
                    ...get().error,
                    getMedications: null
                }
            });
        } catch (err) {
            const error = err as AxiosError<Error>;
            console.error(error);
            set({
                loading: {
                    ...get().loading,
                    getMedications: false,
                },
                error: {
                    ...get().error,
                    getMedications: error
                }
            });
        }
    },
    ...initialState
}));

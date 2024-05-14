"use server";

import { db } from "@/db";
import { CaseColor, CaseFinish, CaseMaterial, PhoneModel } from "@prisma/client";

export const updateCreateCase = async (data: {
    createCaseId: string;
    phoneModel: PhoneModel;
    caseMaterial: CaseMaterial;
    caseFinish: CaseFinish;
    caseColor: CaseColor;
}) => {
    await db.createCase.update({
        where: {
            id: data.createCaseId,
        },
        data: {
            phoneModel: data.phoneModel,
            caseMaterial: data.caseMaterial,
            caseFinish: data.caseFinish,
            caseColor: data.caseColor,
        },
    });
};

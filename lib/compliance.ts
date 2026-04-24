type ComplianceParameters = {
    revenue: number;
    revenueFromRestrictedSector: number;
    newRevenueFromRestrictedSector?: number;
    hasSustainabilityGoal: boolean;
    alreadyInvested: boolean;
    monitoringFlagConcerns?: {
        unethicalWithEvidence: boolean
    };
}

enum InvestmentType {
    Invest,
    DoNotInvest,
    Disinvest,
}

function checkInvestment(params: ComplianceParameters): InvestmentType {
    if (params.revenueFromRestrictedSector == 0) return InvestmentType.Invest;
    const proportion = Math.abs(params.revenue - params.revenueFromRestrictedSector) / params.revenue;

    if (proportion >= 0.1) return InvestmentType.DoNotInvest;
    if (!params.hasSustainabilityGoal) return InvestmentType.DoNotInvest;

    if (!params.monitoringFlagConcerns) return InvestmentType.Invest;
    if (!params.alreadyInvested) return InvestmentType.Invest;

    if (!params.monitoringFlagConcerns) return InvestmentType.Invest;

    if (params.newRevenueFromRestrictedSector && (Math.abs(params.revenue - params.newRevenueFromRestrictedSector) / params.revenue) >= 0.1) return InvestmentType.Disinvest;

    if (!params.monitoringFlagConcerns.unethicalWithEvidence) return InvestmentType.Invest;
    return InvestmentType.DoNotInvest;
}
export const predictFuture = (skillLevel, field, hours) => {
    // Mock AI Logic inspired by the user request
    const multiplier = (skillLevel / 10) * (hours / 40) + 1;
    const growthRate = field === "Technology" ? 1.5 : 1.2;

    const baseIncome = field === "Technology" ? 60000 : 50000;

    const projection = [];
    for (let i = 0; i <= 15; i += 3) {
        const year = 2025 + i;
        const income = Math.round(baseIncome * Math.pow(growthRate, i / 3) * multiplier);
        projection.push({ year, income });
    }

    const skills = [
        "Foundational Mastery",
        "Expert Integration",
        "Creative Disruption",
        "Strategic Leadership",
        "Future Architect"
    ];

    return {
        projection,
        roadmap: skills.map((s, i) => ({
            year: 2025 + i * 4,
            milestone: s
        })),
        careerTitle: `Senior ${field} Strategist`
    };
};

export interface JoepardyState {
    username: string;
    userHistory: IUserHistory[];
    loading: boolean;
    error: null | string | undefined;
    ids: number[];
    category: ICategory[];
    entities: {};
    score: number;
    totalCorrectAnswer: number;
    totalInCorrectAnswer: number;
    startDate: string;
    endDate: string;
}

export interface IJeopardyCategory {
    id: number;
    clues_count: number;
    title: string;
}

export interface IClues {
    airdate: string;
    answer: string;
    category_id: number;
    game_id: number;
    id: number;
    invalid_count: null;
    question: string;
    value: number;
    checkAnswer?: boolean;
}

export interface IUserHistory {
    totalQuestionAnswer: number;
    totalCorrectAnswer: number;
    totalInCorrectAnswer: number;
    startDate: string;
    endDate: string;
    username: string;
}

export interface ICategory {
    clues: IClues[];
    clues_count: number;
    id: number;
    title: string;
}

export interface ICluesResponse {
    id: number;
    clues_count: number;
    clues: IClues[];
    title: string;
}

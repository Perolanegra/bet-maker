import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class AIService {


    /**
     * Analyzes team statistics and provides betting insights
     * @param teamStatistics Object containing last 5 match statistics and season statistics
     * @returns Analysis results with betting recommendations
     */
    async calculateNewStats(teamStatistics: any) {


        const openai = new OpenAI({
            apiKey: process.env['OPENAI_API_KEY'],
        });

    }

}

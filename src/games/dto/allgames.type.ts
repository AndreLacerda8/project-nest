import { Field, ObjectType } from "@nestjs/graphql";
import { Game } from "../entities/game.entity";


@ObjectType()
export class AllGamesType{
    @Field(() => Number)
    minCartValue: number

    @Field(() => [Game])
    allGames: Game[]
}
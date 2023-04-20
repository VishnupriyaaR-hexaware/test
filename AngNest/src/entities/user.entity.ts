import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
   toJSON:{ 
      transform:(doc,ret,options) =>{ 
         const id = ret._id;
         delete ret.__v;
         delete ret._id;
         return {id, ...ret};
      }, 
   },
})
export class User {
   
   @Prop()
   UserId: number; 
   
   @Prop()
   UserName: string; 
   
   @Prop()
   UserAge: number; 
   
   @Prop()
   UserPresent: string; 
   
}

export const UserSchema = SchemaFactory.createForClass(User);
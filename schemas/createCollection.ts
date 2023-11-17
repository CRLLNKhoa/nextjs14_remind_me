import { CollectionColors } from '@/lib/constants';
import {z} from 'zod';

export const createCollectionSchema = z.object({
    name: z.string({ required_error: 'Không được bỏ trống' }).min(4, {
        message: "Tên công việc phải ít nhất 4 kí tự"
    }),
    color: z.string({ required_error: 'Không được bỏ trống' }).refine(color => Object.keys(CollectionColors).includes(color))
})

export type createCollectionSchemaType = z.infer<typeof createCollectionSchema>;
import Joi from "joi";

const productJoi = Joi.object({
    title:Joi.string(),
    description:Joi.string(),
    price:Joi.number(),
    category:Joi.string(),
    Image:Joi.string(),
    quantity:Joi.optional(),
    brand:Joi.string(),
    rating:Joi.number(),
    productCategory:Joi.string()
})
export default productJoi
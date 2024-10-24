import Joi from "joi";

const productJoi = Joi.object({
    title:Joi.string(),
    description:Joi.string(),
    price:Joi.number(),
    category:Joi.string(),
    Image:Joi.string(),
    quantity:Joi.string()
})
export default productJoi
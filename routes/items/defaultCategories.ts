interface Props {
  lng: string;
  type: string;
}

export default ({ lng, type }: Props) => {
  if (lng === "fa") {
    if (type === "traditional-restaurant")
      return [
        "کباب",
        "خورشت",
        "غذای با برنج",
        "سالاد",
        "غذای گیاهی",
        "نوشیدنی",
      ];
    if (type === "fast-food")
      return [
        "پیش غذا",
        "پیتزا",
        "مرغ سوخاری",
        "پاستا",
        "سالاد",
        "برگر",
        "نوشیدنی",
      ];
    if (type === "cafe-restaurant")
      return [
        "کباب",
        "خورشت",
        "غذای با برنج",
        "سالاد",
        "کیک",
        "ناهار",
        "صبحانه",
        "شام",
        "نوشیدنی سرد",
        "نوشیدنی گرم",
      ];
    if (type === "cafe")
      return [
        "چای",
        "قهوه",
        "کیک",
        "خوراک",
        "صبحانه",
        "دسر",
        "میلک شیک",
        "بستنی",
        "ساندویچ",
      ];
    if (type === "traditional-cafe")
      return ["نوشیدنی سرد", "نوشیدنی گرم", "قلیان", "خوراک", "ساندویچ", "سوپ"];
  }

  return [];
};

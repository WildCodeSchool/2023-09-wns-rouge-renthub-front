export default interface MenuCardProps {
  id: number;
  title: string;
  links: { id: number; name: string; url: string }[];
}

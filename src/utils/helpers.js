export function formatRupiah(num) {
  return new Intl.NumberFormat("id-ID").format(num);
}
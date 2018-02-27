select `p`.`id` AS `id`,`p`.`codigo` AS `codigo`,`p`.`fecha` AS `fecha`,`p`.`idcliente` AS `idcliente`,`p`.`ganancia` AS `ganancia`,`p`.`envio` AS `envio`,`p`.`idgarantia` AS `idgarantia`,`c`.`nombres` AS `nombres`,`g`.`descripcion` AS `garantia` ,
count(dtp.id) as productos
from ((`proforma` `p` 
join `cliente` `c` on((`c`.`id` = `p`.`idcliente`))) 
join `garantia` `g` on((`g`.`id` = `p`.`idgarantia`)))
join detalleproforma dtp on dtp.idproforma = p.id
GROUP BY p.id
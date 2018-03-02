<?php
include_once SITE_ROOT . '/MVC/Controller/C_MySQL.php';
include_once SITE_ROOT . '/MVC/Controller/Entidad/Proforma.php';
class ProformaDaoImp {
    public static function save($proforma) {
        $conn = (new C_MySQL())->open();
        $sql = "";
        if ($proforma->Id == 0) {
            $sql = $proforma->Insert();
        } else {
            $sql = $proforma->Update();
        }
        if ($conn->query($sql)) {
            if ($proforma->Id == 0) {
                $proforma->Id = $conn->insert_id;
            }
        }
        $conn->close();
    }
    public static function _list($params, &$count) {
        $conn = (new C_MySQL())->open();
        $banderapag = ($params["top"] > 0 ) ? "limit " . $params['top'] . " offset " . $params['pag'] : "";
        //where estado = 'ACT'
//        $sql = "select SQL_CALC_FOUND_ROWS * from viewProforma order by id desc $banderapag ;";
        $sql = "select SQL_CALC_FOUND_ROWS `p`.`id` AS `id`,`p`.`codigo` AS `codigo`,`p`.`fecha` AS `fecha`,`p`.`idcliente` AS `idcliente`,`p`.`ganancia` AS `ganancia`,`p`.`envio` AS `envio`,`p`.`idgarantia` AS `idgarantia`,`c`.`nombres` AS `nombres`,`g`.`descripcion` AS `garantia` ,
                count(dtp.id) as productos
                from ((`proforma` `p` 
                join `cliente` `c` on((`c`.`id` = `p`.`idcliente`))) 
                join `garantia` `g` on((`g`.`id` = `p`.`idgarantia`)))
                join detalleproforma dtp on dtp.idproforma = p.id
                join producto prod on prod.id = dtp.idproducto
                where prod.descripcion like  CONCAT('%','". $params["buscar"] ."','%')  
                GROUP BY p.id
                ORDER BY p.fecha desc $banderapag ";

        $list = C_MySQL::returnListAsoc($conn, $sql);
        $count = C_MySQL::row_count($conn);
        $conn->close();
        return $list;
    }
    public static function saveDetalle($detalle){
        $conn = (new C_MySQL())->open();
        $sql = "INSERT INTO DETALLEPROFORMA(proforma,producto,cantidad,precioProveedor,precioComision) values('". $detalle["proforma"] ."','". $detalle["producto"] ."','". $detalle["cantidad"] ."','". $detalle["precioProveedor"] ."','". $detalle["precioComision"] ."')";
        $conn->query($sql);
        $conn->close();
    }
    
    
}

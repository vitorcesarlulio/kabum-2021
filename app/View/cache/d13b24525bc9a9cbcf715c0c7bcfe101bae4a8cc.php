<?php
require_once '../app/View/login/check-login.php';
?>

<?php $__env->startSection('title', 'Home'); ?>

<?php $__env->startSection('head'); ?>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('css'); ?>
<style>
</style>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
    <h4>Sobre</h4>
    <div class="row">
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('templates.default', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\kabum-2021\app\View/home/home.blade.php ENDPATH**/ ?>